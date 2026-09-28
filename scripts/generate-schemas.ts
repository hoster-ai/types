/**
 * Script: generate-schemas.ts
 *
 * Purpose
 *  - Convert class-validator metadata (collected from our DTO classes) into
 *    JSON Schemas and emit a single OpenAPI-compatible components map.
 *  - Output file: `openapi/schemas/components.schemas.ts` exporting
 *    `ComponentsSchemas` which contains a `{ [ComponentName]: Schema }` map.
 *
 * Why a single components map?
 *  - The API app only needs to merge all components at once into
 *    `document.components.schemas`. A single file keeps the build and
 *    consumption simple and robust.
 *
 * How it works (high-level)
 *  1) Load the package barrel (`index.ts`) so every exported DTO registers its
 *     decorators into class-validator's metadata storage.
 *  2) Use `validationMetadatasToSchemas` to generate raw JSON Schemas, plus
 *     `targetConstructorToSchema` for exported subclasses that only inherit
 *     their decorators (they have no metadata entry of their own).
 *  3) Remap any `#/definitions/...` refs to `#/components/schemas/...`.
 *  4) Sanitize the result:
 *     - Strip placeholder `$ref`s to Array/Object (Swagger shouldn’t resolve those).
 *     - Remove empty property names and empty strings in `required` arrays.
 *     - Drop properties that resolve to an "empty" schema (e.g., forbidden/never fields).
 *  5) Write `components.schemas.ts` with a typed `const` export.
 *
 * Notes
 *  - A DTO appears in the output only if it is exported from `index.ts`
 *    (or referenced by one that is). `components.schemas.spec.ts` fails when an
 *    exported DTO has no schema or a `$ref` points nowhere.
 *  - If you later decide to generate per-class schema files again, reintroduce
 *    the per-target write logic that was removed for simplicity.
 */
import 'reflect-metadata';
import path from 'node:path';
import fs from 'node:fs';
import { getMetadataStorage } from 'class-validator';
import {
  targetConstructorToSchema,
  validationMetadatasToSchemas,
} from 'class-validator-jsonschema';

// Load the WHOLE public barrel so every DTO module the package exports
// registers its decorators. One import instead of a hand-kept list, so a new
// DTO cannot be forgotten here (issue #34); the spec checks the result.
import * as Pkg from '../index';
import { FIELD_DTO_CLASSES } from '../index';

// Named enums shared across DTOs. We emit these as standalone component
// schemas so DTO properties can `$ref` them instead of inlining the enum.
// This stops openapi-generator from minting one ad-hoc enum per property
// (e.g. InfoDtoListenEventsEnum, ProductInfoDtoListenEventsEnum, ...) for
// what is logically a single enum. Adding a future enum is one line here.
import { EventsEnum } from '../enums/events.enum';
import { RolesEnum } from '../enums/roles.enum';
import { LanguageEnum } from '../enums/language.enum';
import { CountryEnum } from '../enums/country.enum';
import { CurrencyEnum } from '../enums/currency.enum';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { ProductActionsEnum } from '../enums/item-actions.enum';
import { OpenMethodEnum } from '../enums/open-method.enum';
import { NotificationMessageTypeEnum } from '../enums/notification/notification-message-type.enum';
import { SetupStatusEnum } from '../enums/setup-status.enum';
import { ResponseStatusEnum } from '../enums/response-status.enum';
import { InvoiceItemActionsEnum } from '../enums/invoice/invoice-item-actions.enum';
import { InvoiceTypesEnum } from '../enums/invoice/invoice-types.enum';

const ENUM_REGISTRY = {
  EventsEnum,
  RolesEnum,
  LanguageEnum,
  CountryEnum,
  CurrencyEnum,
  FieldTypeEnum,
  ProductActionsEnum,
  OpenMethodEnum,
  NotificationMessageTypeEnum,
  SetupStatusEnum,
  ResponseStatusEnum,
  InvoiceItemActionsEnum,
  InvoiceTypesEnum,
};

const enumSchemas = Object.fromEntries(
  Object.entries(ENUM_REGISTRY).map(([name, e]) => [
    name,
    { type: 'string', enum: Object.values(e) },
  ]),
);

/**
 * Ensure an output directory exists.
 */
function ensureDir(dir: string) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  const outDir = path.resolve(__dirname, '../openapi/schemas');
  ensureDir(outDir);

  // 1) Build schema map from class-validator metadata
  const storage = getMetadataStorage();
  const generatedSchemas: Record<string, unknown> =
    validationMetadatasToSchemas({ classValidatorMetadataStorage: storage });

  // 1b) Exported subclasses without decorators of their own (e.g.
  //     `InvoiceResponseDto extends ProformaInvoiceResponseDto {}`) have no
  //     metadata entry, so the call above skips them. Emit them from their
  //     inherited metadata.
  for (const value of Object.values(Pkg)) {
    if (typeof value !== 'function' || value.name in generatedSchemas) continue;
    const inherited = storage.getTargetValidationMetadatas(
      value,
      '',
      true,
      false,
    );
    if (inherited.length === 0) continue;
    generatedSchemas[value.name] = targetConstructorToSchema(value, {
      classValidatorMetadataStorage: storage,
    });
  }

  // Merge the named enum schemas in BEFORE remap/sanitize so they go through
  // the exact same passes as the generated DTO schemas. They carry both
  // `type` and `enum`, so sanitization keeps them intact.
  const schemas = { ...generatedSchemas, ...enumSchemas };

  /**
   * 2) Helper to remap refs for Swagger/OpenAPI (#/components/schemas/...)
   *    and strip placeholder refs like Array/Object that Swagger tries to resolve.
   *    We keep `type`/`items`/etc. that already describe the array/object shape.
   */
  const remapRefs = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(remapRefs);
    if (obj && typeof obj === 'object') {
      const out: any = {};
      for (const [k, v] of Object.entries(obj)) {
        if (k === '$ref' && typeof v === 'string') {
          const toComponents = v.startsWith('#/definitions/')
            ? v.replace('#/definitions/', '#/components/schemas/')
            : v;
          // Drop placeholder refs to Array/Object; keep inline type/items instead
          if (
            toComponents.endsWith('/Array') ||
            toComponents.endsWith('/Object')
          ) {
            // do not include this $ref; other keys like type/items will remain
          } else {
            out[k] = toComponents;
          }
        } else {
          out[k] = remapRefs(v);
        }
      }
      return out;
    }
    return obj;
  };

  /**
   * 3) Sanitize schemas
   *  - Remove artifacts: properties with empty name ("") and empty `required` entries.
   *  - Drop properties with no meaningful shape (no $ref/type/compose/items/properties/enum/format),
   *    which typically come from forbidden/never fields.
   *  - Remove invalid "not: { type: 'null' }" constraints (not valid in OpenAPI)
   */
  const sanitizeSchema = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(sanitizeSchema);
    if (obj && typeof obj === 'object') {
      const out: any = {};
      for (const [k, v] of Object.entries(obj)) {
        // Skip invalid "not: { type: 'null' }" constraints
        if (
          k === 'not' &&
          v &&
          typeof v === 'object' &&
          (v as any).type === 'null'
        ) {
          continue;
        }

        if (k === 'properties' && v && typeof v === 'object') {
          const cleanedProps: any = {};
          for (const [pk, pv] of Object.entries(v as Record<string, any>)) {
            if (!pk || pk.trim() === '') continue;
            const pvSan = sanitizeSchema(pv);
            if ('enum' in pvSan && !('type' in pvSan)) {
              pvSan.type = 'string';
            }
            // Drop properties with effectively empty schemas (no shape info)
            const hasShape =
              pvSan &&
              typeof pvSan === 'object' &&
              ('$ref' in pvSan ||
                'type' in pvSan ||
                'oneOf' in pvSan ||
                'allOf' in pvSan ||
                'anyOf' in pvSan ||
                'items' in pvSan ||
                'properties' in pvSan ||
                'enum' in pvSan ||
                'format' in pvSan);
            if (hasShape) {
              cleanedProps[pk] = pvSan;
            }
          }
          out[k] = cleanedProps;
        } else if (k === 'required' && Array.isArray(v)) {
          const cleaned = (v as any[]).filter(
            (x) => typeof x === 'string' && x.trim() !== '',
          );
          if (cleaned.length > 0) {
            out[k] = cleaned;
          }
        } else {
          out[k] = sanitizeSchema(v);
        }
      }
      return out;
    }
    return obj;
  };

  /**
   * 3b) Collapse `$ref` sibling keywords.
   *  class-validator-jsonschema MERGES the schema derived from validation
   *  decorators (e.g. `@IsEnum` -> `{ type, enum }`) with the object passed to
   *  `@JSONSchema`. When a `@JSONSchema` provides a `$ref`, the auto-generated
   *  `enum`/`type` survive as siblings of that `$ref`. In OpenAPI 3.0 any
   *  sibling of `$ref` is ignored, but if we leave the inline `enum` in place
   *  openapi-generator mints an ad-hoc per-property enum from it. So whenever a
   *  node carries a `$ref`, reduce it to just `{ $ref }`. This makes every
   *  named-enum reference a real reference to the shared enum schema.
   */
  const collapseRefSiblings = (obj: any): any => {
    if (Array.isArray(obj)) return obj.map(collapseRefSiblings);
    if (obj && typeof obj === 'object') {
      if (typeof (obj as any).$ref === 'string') {
        return { $ref: (obj as any).$ref };
      }
      const out: any = {};
      for (const [k, v] of Object.entries(obj)) {
        out[k] = collapseRefSiblings(v);
      }
      return out;
    }
    return obj;
  };

  // 4) Emit full components map to be merged into an OpenAPI document
  const componentsOut = path.join(outDir, 'components.schemas.ts');
  // Remap and ensure required helper definitions exist
  const remappedComponents = collapseRefSiblings(
    sanitizeSchema(remapRefs(schemas)),
  ) as Record<string, unknown>;

  // 4a) Manually inject `AnyFieldDto` as a discriminated `oneOf` of every concrete
  //     field DTO. `class-validator-jsonschema` cannot derive this from a TS union
  //     alias because there are no class-validator decorators attached to it.
  const fieldOneOf = Object.values(FIELD_DTO_CLASSES).map((cls) => ({
    $ref: `#/components/schemas/${cls.name}`,
  }));
  remappedComponents.AnyFieldDto = {
    title: 'AnyFieldDto',
    description:
      'Discriminated union of every concrete field DTO. Discriminator is the string-literal `type` property.',
    oneOf: fieldOneOf,
    discriminator: {
      propertyName: 'type',
      mapping: Object.fromEntries(
        Object.entries(FIELD_DTO_CLASSES).map(([literal, cls]) => [
          literal,
          `#/components/schemas/${cls.name}`,
        ]),
      ),
    },
  };

  // 5) Write the file with a typed `const` export for easy import/merge in the API app
  const componentsContent = `export const ComponentsSchemas = ${JSON.stringify(remappedComponents, null, 2)} as const;\n`;
  fs.writeFileSync(componentsOut, componentsContent, 'utf8');
  console.log(`Generated: ${path.relative(process.cwd(), componentsOut)}`);
}

main();
