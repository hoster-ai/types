/**
 * Pure transformation passes applied by `generate-schemas.ts` to the raw
 * schemas of class-validator-jsonschema. Kept apart from the script so they
 * can be unit-tested without writing files.
 */

type JsonObject = Record<string, unknown>;

const isObject = (v: unknown): v is JsonObject =>
  !!v && typeof v === 'object' && !Array.isArray(v);

/** Keys whose value is instance data, not a schema: never walk into them. */
const DATA_KEYWORDS = new Set([
  'example',
  'examples',
  'default',
  'enum',
  'const',
]);

/** Keys whose value maps names to schemas (the names are not keywords). */
const SCHEMA_MAP_KEYWORDS = new Set([
  'properties',
  'patternProperties',
  'definitions',
  '$defs',
]);

/**
 * Walk a schema tree and let `visit` rebuild each schema node. `visit` gets
 * the node and a `recurse` callback for the node's sub-schemas. Data keywords
 * are copied as-is and the keys of a `properties`-like map are treated as
 * names, never as keywords.
 */
const walkSchema = (
  schema: unknown,
  visit: (
    node: JsonObject,
    recurse: (key: string, v: unknown) => unknown,
  ) => JsonObject,
): unknown => {
  if (Array.isArray(schema)) return schema.map((s) => walkSchema(s, visit));
  if (!isObject(schema)) return schema;
  const recurse = (key: string, v: unknown): unknown => {
    if (DATA_KEYWORDS.has(key)) return v;
    if (SCHEMA_MAP_KEYWORDS.has(key) && isObject(v)) {
      return Object.fromEntries(
        Object.entries(v).map(([name, s]) => [name, walkSchema(s, visit)]),
      );
    }
    return walkSchema(v, visit);
  };
  return visit(schema, recurse);
};

/** Apply a schema-level pass to every schema of a components map. */
export const mapComponents = (
  components: JsonObject,
  pass: (schema: unknown) => unknown,
): JsonObject =>
  Object.fromEntries(
    Object.entries(components).map(([name, s]) => [name, pass(s)]),
  );

/**
 * Collapse `$ref` sibling keywords.
 *  class-validator-jsonschema merges the validator-derived schema (e.g.
 *  `@IsEnum` -> `{ type, enum }`) with the `@JSONSchema` object, so a `$ref`
 *  ends up next to an inline `enum`/`type`, from which openapi-generator mints
 *  an ad-hoc per-property enum. Keep only annotation siblings (title,
 *  description, ...) and drop every shape keyword.
 */
const REF_ANNOTATIONS = [
  'title',
  'description',
  'example',
  'deprecated',
  'readOnly',
  'writeOnly',
];
export const collapseRefSiblings = (schema: unknown): unknown =>
  walkSchema(schema, (node, recurse) => {
    if (typeof node.$ref === 'string') {
      const out: JsonObject = { $ref: node.$ref };
      for (const k of REF_ANNOTATIONS) if (k in node) out[k] = node[k];
      return out;
    }
    const out: JsonObject = {};
    for (const [k, v] of Object.entries(node)) out[k] = recurse(k, v);
    return out;
  });

/**
 * Strip validator-derived keywords next to `oneOf`/`anyOf` (issue #36).
 *  A `@JSONSchema` `oneOf` already describes every allowed shape, but the
 *  keywords derived from the validation decorators (`@IsNotEmpty` ->
 *  `minLength`, `@IsDateString` -> `format`, `@IsArray` -> `type`/`items`)
 *  are merged in as siblings. Siblings are AND-ed with the `oneOf`, so the
 *  result contradicts it (e.g. `type: 'string'` next to a oneOf of objects).
 *  `properties` stay: a class-level oneOf only picks which ones are required.
 */
const SHAPE_KEYWORDS = [
  'type',
  'items',
  'format',
  'enum',
  'pattern',
  'minLength',
  'maxLength',
  'minItems',
  'maxItems',
  'minimum',
  'maximum',
];
export const collapseCompositionSiblings = (schema: unknown): unknown =>
  walkSchema(schema, (node, recurse) => {
    const isComposition =
      Array.isArray(node.oneOf) || Array.isArray(node.anyOf);
    const out: JsonObject = {};
    for (const [k, v] of Object.entries(node)) {
      if (isComposition && SHAPE_KEYWORDS.includes(k)) continue;
      out[k] = recurse(k, v);
    }
    return out;
  });
