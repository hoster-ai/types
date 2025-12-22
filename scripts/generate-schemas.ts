/* eslint-disable no-console */
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
 *  1) Load DTO modules (side-effect imports) so their decorators register
 *     into class-validator's metadata storage.
 *  2) Use `validationMetadatasToSchemas` to generate raw JSON Schemas.
 *  3) Remap any `#/definitions/...` refs to `#/components/schemas/...`.
 *  4) Sanitize the result:
 *     - Strip placeholder `$ref`s to Array/Object (Swagger shouldn’t resolve those).
 *     - Remove empty property names and empty strings in `required` arrays.
 *     - Drop properties that resolve to an "empty" schema (e.g., forbidden/never fields).
 *  5) Write `components.schemas.ts` with a typed `const` export.
 *
 * Notes
 *  - Keep the side-effect imports up to date whenever you add new DTOs that
 *    should appear in the output. If a class isn’t imported anywhere, its
 *    decorators won’t be registered and it won’t be emitted.
 *  - If you later decide to generate per-class schema files again, reintroduce
 *    the per-target write logic that was removed for simplicity.
 */
import 'reflect-metadata';
import path from 'node:path';
import fs from 'node:fs';
import { getMetadataStorage } from 'class-validator';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';

// Import dtos to register their decorators in metadata storage
import '../dtos/country.dto';
import '../dtos/notification/notification-info.dto';
import '../dtos/product/product-info.dto';

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
  const schemas = validationMetadatasToSchemas({
    classValidatorMetadataStorage: storage,
  });

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
          if (toComponents.endsWith('/Array') || toComponents.endsWith('/Object')) {
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
        if (k === 'not' && v && typeof v === 'object' && (v as any).type === 'null') {
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
            const hasShape = pvSan && typeof pvSan === 'object' && (
              ('$ref' in pvSan) ||
              ('type' in pvSan) ||
              ('oneOf' in pvSan) ||
              ('allOf' in pvSan) ||
              ('anyOf' in pvSan) ||
              ('items' in pvSan) ||
              ('properties' in pvSan) ||
              ('enum' in pvSan) ||
              ('format' in pvSan)
            );
            if (hasShape) {
              cleanedProps[pk] = pvSan;
            }
          }
          out[k] = cleanedProps;
        } else if (k === 'required' && Array.isArray(v)) {
          const cleaned = (v as any[]).filter((x) => typeof x === 'string' && x.trim() !== '');
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


  // 4) Emit full components map to be merged into an OpenAPI document
  const componentsOut = path.join(outDir, 'components.schemas.ts');
  // Remap and ensure required helper definitions exist
  const remappedComponents = sanitizeSchema(remapRefs(schemas)) as Record<string, unknown>;

  // 5) Write the file with a typed `const` export for easy import/merge in the API app
  const componentsContent = `export const ComponentsSchemas = ${JSON.stringify(remappedComponents, null, 2)} as const;\n`;
  fs.writeFileSync(componentsOut, componentsContent, 'utf8');
  console.log(`Generated: ${path.relative(process.cwd(), componentsOut)}`);
}

main();
