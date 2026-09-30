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
 *     - Collapse keywords next to `$ref` / `oneOf` (`schema-passes.ts`).
 *  5) `buildComponentsSchemas()` returns the map in memory; `write-schemas.ts`
 *     (`npm run build:schemas`) writes it to `components.schemas.ts`.
 *
 * Notes
 *  - A DTO appears in the output only if it is exported from `index.ts`
 *    (or referenced by one that is). `components.schemas.spec.ts` fails when an
 *    exported DTO has no schema or a `$ref` points nowhere.
 *  - If you later decide to generate per-class schema files again, reintroduce
 *    the per-target write logic that was removed for simplicity.
 */
import 'reflect-metadata';
import { getMetadataStorage } from 'class-validator';
import {
  targetConstructorToSchema,
  validationMetadatasToSchemas,
} from 'class-validator-jsonschema';
import {
  collapseCompositionSiblings,
  collapseRefSiblings,
  mapComponents,
} from './schema-passes';

// Load the WHOLE public barrel so every DTO module the package exports
// registers its decorators. One import instead of a hand-kept list, so a new
// DTO cannot be forgotten here (issue #34); the spec checks the result.
import * as Pkg from '../index';
import { FIELD_DTO_CLASSES } from '../index';

// Named enums shared across DTOs. We emit these as standalone component
// schemas so DTO properties can `$ref` them instead of inlining the enum.
// This stops openapi-generator from minting one ad-hoc enum per property
// (`<Dto><Property>Enum`, one per DTO property) for
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
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

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
  VatTreatmentEnum,
};

const enumSchemas = Object.fromEntries(
  Object.entries(ENUM_REGISTRY).map(([name, e]) => [
    name,
    { type: 'string', enum: Object.values(e) },
  ]),
);

/**
 * Build the full components map in memory (no file I/O), so the spec can
 * compare it against the committed `ComponentsSchemas`.
 */
export function buildComponentsSchemas(): Record<string, unknown> {
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

  // 3b/3c) Collapse keywords next to `$ref` / `oneOf` (see schema-passes.ts)
  const remappedComponents = mapComponents(
    sanitizeSchema(remapRefs(schemas)),
    (schema) => collapseCompositionSiblings(collapseRefSiblings(schema)),
  );

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

  return remappedComponents;
}
