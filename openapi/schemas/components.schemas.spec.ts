import { ComponentsSchemas } from './components.schemas';

/**
 * Tripwire spec for the generated OpenAPI component schemas.
 *
 * Background: DTO enum properties used to inline `{ type: 'string', enum: [...] }`,
 * which made openapi-generator mint one ad-hoc enum per property
 * (InfoDtoListenEventsEnum, ProductInfoDtoListenEventsEnum, ...) for what is
 * logically a single enum. We now emit each shared enum as a standalone named
 * component schema and reference it via `$ref`. These tests fail if that
 * regresses (e.g. a new DTO adds an inline enum without registering + $ref-ing it).
 */

type AnySchema = Record<string, any>;
const Schemas = ComponentsSchemas as Record<string, AnySchema>;

const NAMED_ENUMS = [
  'EventsEnum',
  'RolesEnum',
  'LanguageEnum',
  'CountryEnum',
  'FieldTypeEnum',
  'ProductActionsEnum',
  'OpenMethodEnum',
  'NotificationMessageTypeEnum',
] as const;

/**
 * Paths (relative to a top-level schema) that are allowed to keep an inline
 * enum because they are single-value `@IsIn` discriminators, not real enums.
 * These are length-1 enums so the generic tripwire skips them anyway, but the
 * allowlist documents the intent explicitly.
 */
const DISCRIMINATOR_ALLOWLIST = new Set<string>([
  'MenuDtoWithUrl.properties.type',
  'MenuDtoWithSubmenu.properties.type',
]);

const isRef = (node: any): boolean =>
  !!node && typeof node === 'object' && typeof node.$ref === 'string';

describe('ComponentsSchemas - named enum schemas', () => {
  it('exposes every shared enum as a standalone { type: "string", enum: [...] } schema', () => {
    for (const name of NAMED_ENUMS) {
      const schema = Schemas[name];
      expect(schema).toBeDefined();
      expect(schema.type).toBe('string');
      expect(Array.isArray(schema.enum)).toBe(true);
      expect(schema.enum.length).toBeGreaterThanOrEqual(2);
      // values must be non-empty strings (LanguageEnum legitimately contains a
      // duplicate code, so do not assert uniqueness here).
      for (const v of schema.enum) {
        expect(typeof v).toBe('string');
        expect(v.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('ComponentsSchemas - enum properties are $refs (no inline enums)', () => {
  const refExpectations: Array<{ label: string; node: () => any }> = [
    {
      label: 'InfoDto.listenEvents.items',
      node: () => Schemas.InfoDto.properties.listenEvents.items,
    },
    {
      label: 'InfoDto.requiredRoles.items',
      node: () => Schemas.InfoDto.properties.requiredRoles.items,
    },
    {
      label: 'InfoDto.supportedLanguages.items',
      node: () => Schemas.InfoDto.properties.supportedLanguages.items,
    },
    {
      label: 'ProductInfoDto.supportedActions.items',
      node: () => Schemas.ProductInfoDto.properties.supportedActions.items,
    },
    {
      label: 'CountryDto.code',
      node: () => Schemas.CountryDto.properties.code,
    },
    {
      label: 'MultilangTextDto.language',
      node: () => Schemas.MultilangTextDto.properties.language,
    },
    {
      label: 'NotificationInfoDto.type',
      node: () => Schemas.NotificationInfoDto.properties.type,
    },
    {
      label: 'ActionDto.openMethod',
      node: () => Schemas.ActionDto.properties.openMethod,
    },
    {
      label: 'FieldDto.type',
      node: () => Schemas.FieldDto.properties.type,
    },
  ];

  it.each(refExpectations)(
    '$label is a $ref with no inline enum',
    ({ node }) => {
      const n = node();
      expect(isRef(n)).toBe(true);
      expect(n.enum).toBeUndefined();
    },
  );

  it('keeps the array node structure intact for array enum properties', () => {
    const arr = Schemas.InfoDto.properties.supportedLanguages;
    expect(arr.type).toBe('array');
    expect(isRef(arr.items)).toBe(true);
    // The array node itself must NOT carry an inline enum.
    expect(arr.enum).toBeUndefined();
  });
});

describe('ComponentsSchemas - generic inline-enum regression tripwire', () => {
  it('contains no inline enum (length >= 2) outside top-level named enum defs and the discriminator allowlist', () => {
    const offenders: string[] = [];

    const walk = (node: any, path: string, topKey: string) => {
      if (Array.isArray(node)) {
        node.forEach((child, i) => walk(child, `${path}[${i}]`, topKey));
        return;
      }
      if (node && typeof node === 'object') {
        if (Array.isArray(node.enum) && node.enum.length >= 2) {
          const isTopLevelNamedEnumDef = path === topKey;
          const relative = path.slice(topKey.length + 1); // strip "TopKey."
          const isAllowlisted = DISCRIMINATOR_ALLOWLIST.has(
            `${topKey}.${relative}`,
          );
          if (!isTopLevelNamedEnumDef && !isAllowlisted) {
            offenders.push(path);
          }
        }
        for (const [k, v] of Object.entries(node)) {
          walk(v, `${path}.${k}`, topKey);
        }
      }
    };

    for (const [topKey, schema] of Object.entries(Schemas)) {
      walk(schema, topKey, topKey);
    }

    expect(offenders).toEqual([]);
  });
});
