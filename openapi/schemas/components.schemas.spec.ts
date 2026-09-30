import 'reflect-metadata';
import { getMetadataStorage } from 'class-validator';
import * as Pkg from '../../index';
import { ComponentsSchemas } from './components.schemas';

/**
 * Tripwire spec for the generated OpenAPI component schemas.
 *
 * Background: DTO enum properties used to inline `{ type: 'string', enum: [...] }`,
 * which made openapi-generator mint one ad-hoc enum per property
 * (`<Dto><Property>Enum`, one per DTO property) for what is
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
  'CurrencyEnum',
  'FieldTypeEnum',
  'ProductActionsEnum',
  'OpenMethodEnum',
  'NotificationMessageTypeEnum',
  'SetupStatusEnum',
  'ResponseStatusEnum',
  'InvoiceItemActionsEnum',
  'InvoiceTypesEnum',
] as const;

/**
 * Paths (relative to a top-level schema) that are allowed to keep an inline
 * enum because they are single-value `@IsIn` discriminators, not real enums.
 * These are length-1 enums so the generic tripwire skips them anyway, but the
 * allowlist documents the intent explicitly.
 */
const DISCRIMINATOR_ALLOWLIST = new Set<string>([]);

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
      label: 'JwtPayloadDto.acceptedRoles.items',
      node: () => Schemas.JwtPayloadDto.properties.acceptedRoles.items,
    },
    {
      label: 'CompanyDataDto.languages.items',
      node: () => Schemas.CompanyDataDto.properties.languages.items,
    },
    {
      label: 'CompanyDataDto.defaultLanguage',
      node: () => Schemas.CompanyDataDto.properties.defaultLanguage,
    },
    {
      label: 'ProductItemDataDto.action',
      node: () => Schemas.ProductItemDataDto.properties.action,
    },
    {
      label: 'InvoiceItemDataDto.action',
      node: () => Schemas.InvoiceItemDataDto.properties.action,
    },
    {
      label: 'SetupStatusResponseDto.status',
      node: () => Schemas.SetupStatusResponseDto.properties.status,
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
      label: 'CountriesFieldDto.value.items',
      node: () => Schemas.CountriesFieldDto.properties.value.items,
    },
    {
      label: 'CurrencyFieldDto.value',
      node: () => Schemas.CurrencyFieldDto.properties.value,
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
    const arr = Schemas.CompanyDataDto.properties.languages;
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

/**
 * Coverage of the core ↔ integration contract (issue #34): every DTO class the
 * package exports must have a schema, and every `$ref` must point to one.
 */
type Ctor = abstract new (...args: never[]) => unknown;

const isClass = (v: unknown): v is Ctor =>
  typeof v === 'function' &&
  /^class[\s{]/.test(Function.prototype.toString.call(v));

/** Exported classes that carry class-validator metadata (own or inherited). */
const exportedDtoClasses = (): Array<[string, Ctor]> => {
  const storage = getMetadataStorage();
  return Object.entries(Pkg)
    .filter(([, v]) => isClass(v))
    .filter(
      ([, v]) =>
        storage.getTargetValidationMetadatas(v as Ctor, '', true, false)
          .length > 0,
    ) as Array<[string, Ctor]>;
};

describe('ComponentsSchemas - contract coverage', () => {
  it('has a schema for every exported DTO class with class-validator metadata', () => {
    const missing = exportedDtoClasses()
      .map(([name]) => name)
      .filter((name) => !(name in Schemas));
    expect(missing).toEqual([]);
  });

  it('keys each schema by the class name it is exported under', () => {
    const renamed = exportedDtoClasses()
      .filter(([exportName, cls]) => exportName !== cls.name)
      .map(([exportName, cls]) => `${exportName} -> ${cls.name}`);
    expect(renamed).toEqual([]);
  });

  it('covers the wire DTOs of the integration contract', () => {
    const wire = [
      'CompanyDataDto',
      'ValidateAttributesRequestDto',
      'ValidateAttributesResponseDto',
      'SetupStatusResponseDto',
      'SetupStatusEnum',
      'BaseResponse',
      'ErrorResponseDto',
      'ResponseStatusEnum',
      'NotificationSendRequestDto',
      'NotificationSendResponseDto',
      'AttachmentDto',
      'EmailSenderDto',
      'SmsSenderDto',
      'PushSenderDto',
      'EmailReceiverDto',
      'SmsReceiverDto',
      'PushReceiverDto',
      'ProductCreateRequestDto',
      'ProductCreateResponseDto',
      'ProductRenewRequestDto',
      'ProductRenewResponseDto',
      'ProductUpgradeRequestDto',
      'ProductUpgradeResponseDto',
      'ProductDowngradeRequestDto',
      'ProductDowngradeResponseDto',
      'ProductSuspendRequestDto',
      'ProductSuspendResponseDto',
      'ProductUnsuspendRequestDto',
      'ProductUnsuspendResponseDto',
      'ProductDeleteRequestDto',
      'ProductDeleteResponseDto',
      'ProformaInvoiceRequestDto',
      'ProformaInvoiceResponseDto',
      'InvoiceRequestDto',
      'InvoiceResponseDto',
      'CreditNoteRequestDto',
      'CreditNoteResponseDto',
      'TaxDetailsRequestDto',
      'TaxDetailsResponseDto',
    ];
    expect(wire.filter((name) => !(name in Schemas))).toEqual([]);
  });

  it('never registers two different classes under the same name', () => {
    const storage = getMetadataStorage() as unknown as {
      validationMetadatas: Map<unknown, unknown>;
    };
    const byName = new Map<string, Set<unknown>>();
    for (const target of storage.validationMetadatas.keys()) {
      if (typeof target !== 'function') continue;
      const set = byName.get(target.name) ?? new Set<unknown>();
      set.add(target);
      byName.set(target.name, set);
    }
    const dupes = [...byName]
      .filter(([, set]) => set.size > 1)
      .map(([name]) => name);
    expect(dupes).toEqual([]);
  });

  it('resolves every $ref to an existing component', () => {
    const unresolved = new Set<string>();
    const walk = (node: unknown): void => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === 'object') {
        for (const [k, v] of Object.entries(node)) {
          if (k === '$ref' && typeof v === 'string') {
            const prefix = '#/components/schemas/';
            if (!v.startsWith(prefix) || !(v.slice(prefix.length) in Schemas)) {
              unresolved.add(v);
            }
          } else {
            walk(v);
          }
        }
      }
    };
    walk(Schemas);
    expect([...unresolved]).toEqual([]);
  });
});

describe('ComponentsSchemas - oneOf/anyOf carry no contradicting siblings (#36)', () => {
  it('has no shape keyword next to a oneOf/anyOf', () => {
    const shapeKeywords = ['type', 'items', 'format', 'minLength', 'enum'];
    const offenders: string[] = [];
    const walk = (node: unknown, path: string): void => {
      if (Array.isArray(node)) {
        node.forEach((child, i) => walk(child, `${path}[${i}]`));
        return;
      }
      if (node && typeof node === 'object') {
        const obj = node as Record<string, unknown>;
        if (Array.isArray(obj.oneOf) || Array.isArray(obj.anyOf)) {
          for (const k of shapeKeywords) {
            if (k in obj) offenders.push(`${path}.${k}`);
          }
        }
        for (const [k, v] of Object.entries(obj)) walk(v, `${path}.${k}`);
      }
    };
    walk(Schemas, 'ComponentsSchemas');
    expect(offenders).toEqual([]);
  });
});
