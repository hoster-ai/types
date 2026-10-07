import 'reflect-metadata';
import { getMetadataStorage } from 'class-validator';
import * as Pkg from '../../index';
import { walkSchema } from '../../scripts/schema-passes';
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

// Same rule as the generator: every exported `*Enum` is a named schema.
const NAMED_ENUMS = Object.keys(Pkg).filter((name) => name.endsWith('Enum'));

/**
 * Visit every schema node of a component (data keywords like `enum`/`example`
 * and property names are skipped by `walkSchema`, so they never look like
 * keywords).
 */
const forEachNode = (
  schema: unknown,
  fn: (node: Record<string, any>) => void,
): void => {
  walkSchema(schema, (node, recurse) => {
    fn(node);
    for (const [k, v] of Object.entries(node)) recurse(k, v);
    return node;
  });
};

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
  it('contains no inline enum (length >= 2) outside top-level named enum defs', () => {
    // Single-value `@IsIn` discriminators (MenuDtoWithUrl.type, ...) are
    // length-1 enums, so they are not real enums and pass.
    const offenders: string[] = [];
    for (const [topKey, schema] of Object.entries(Schemas)) {
      forEachNode(schema, (node) => {
        if (node === schema && NAMED_ENUMS.includes(topKey)) return;
        if (Array.isArray(node.enum) && node.enum.length >= 2) {
          offenders.push(`${topKey}${node.title ? ` (${node.title})` : ''}`);
        }
      });
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
    const prefix = '#/components/schemas/';
    for (const schema of Object.values(Schemas)) {
      forEachNode(schema, (node) => {
        const ref = node.$ref;
        if (typeof ref !== 'string') return;
        if (!ref.startsWith(prefix) || !(ref.slice(prefix.length) in Schemas)) {
          unresolved.add(ref);
        }
      });
    }
    expect([...unresolved]).toEqual([]);
  });
});

describe('ComponentsSchemas - oneOf/anyOf carry no contradicting siblings (#36)', () => {
  it('has no shape keyword next to a oneOf/anyOf', () => {
    const shapeKeywords = ['type', 'items', 'format', 'minLength', 'enum'];
    const offenders: string[] = [];
    for (const [topKey, schema] of Object.entries(Schemas)) {
      forEachNode(schema, (node) => {
        if (!Array.isArray(node.oneOf) && !Array.isArray(node.anyOf)) return;
        for (const k of shapeKeywords) {
          if (k in node) offenders.push(`${topKey}: ${node.title ?? ''}.${k}`);
        }
      });
    }
    expect(offenders).toEqual([]);
  });
});

describe('ComponentsSchemas - invoice tax contract (#40)', () => {
  const props = (name: string): AnySchema => Schemas[name].properties;

  it('carries the VAT of every line and the document totals', () => {
    const item = Schemas.InvoiceItemDataDto;
    for (const field of ['netAmount', 'vatRate', 'vatAmount', 'treatment']) {
      expect(item.required).toContain(field);
    }
    expect(item.required).not.toContain('exemptionReason');
    expect(item.properties.treatment.$ref).toBe(
      '#/components/schemas/VatTreatmentEnum',
    );
    for (const dto of [
      'ProformaInvoiceRequestDto',
      'InvoiceRequestDto',
      'CreditNoteRequestDto',
    ]) {
      for (const field of ['netTotal', 'vatTotal', 'totalAmount']) {
        expect(Schemas[dto].required).toContain(field);
      }
    }
  });

  it('requires the three parent references only on a credit note', () => {
    const parents = [
      'parentInvoiceId',
      'parentExternalInvoiceId',
      'parentInvoiceNumber',
    ];
    for (const field of parents) {
      expect(Schemas.CreditNoteRequestDto.required).toContain(field);
    }
    expect(props('InvoiceRequestDto').parentExternalInvoiceId).toBeUndefined();
  });

  it('does not force the document fields on a failure or pending report', () => {
    for (const dto of [
      'ProformaInvoiceResponseDto',
      'InvoiceResponseDto',
      'CreditNoteResponseDto',
    ]) {
      for (const field of ['invoiceUrl', 'invoiceNumber', 'invoiceId']) {
        expect(Schemas[dto].required ?? []).not.toContain(field);
      }
      expect(props(dto).invoiceId).toBeDefined();
      expect(props(dto).invoiceNumber).toBeDefined();
    }
  });

  it('describes the tax integration answer', () => {
    const response = Schemas.TaxDetailsResponseDto;
    expect(response.required).toEqual(
      expect.arrayContaining(['vatRate', 'treatment']),
    );
    expect(response.properties.vatRate).toMatchObject({
      minimum: 0,
      maximum: 100,
    });
    expect(response.properties.vatNumberValid.type).toBe('boolean');
    expect(response.properties.TINValid).toBeUndefined();
    expect([...Schemas.TaxDetailsRequestDto.required].sort()).toEqual([
      'buyerCountry',
      'isBusinessContact',
      'sellerCountry',
    ]);
  });
});
