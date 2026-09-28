import 'reflect-metadata';
import { buildComponentsSchemas } from './generate-schemas';
import {
  collapseCompositionSiblings,
  collapseRefSiblings,
} from './schema-passes';
import { ComponentsSchemas } from '../openapi/schemas/components.schemas';

describe('collapseRefSiblings', () => {
  it('keeps annotations next to a $ref and drops shape keywords', () => {
    const schema = {
      properties: {
        country: {
          $ref: '#/components/schemas/CountryEnum',
          title: 'Country',
          description: 'The country of the client.',
          example: 'GR',
          deprecated: true,
          readOnly: true,
          writeOnly: false,
          type: 'string',
          enum: ['GR', 'CY'],
          items: { type: 'string' },
          format: 'iso',
        },
      },
    };
    expect(collapseRefSiblings(schema)).toEqual({
      properties: {
        country: {
          $ref: '#/components/schemas/CountryEnum',
          title: 'Country',
          description: 'The country of the client.',
          example: 'GR',
          deprecated: true,
          readOnly: true,
          writeOnly: false,
        },
      },
    });
  });
});

describe('collapseCompositionSiblings', () => {
  it('strips shape keywords next to a oneOf', () => {
    const schema = {
      title: 'Errors',
      type: 'array',
      items: { type: 'string' },
      minLength: 1,
      oneOf: [{ type: 'string' }, { type: 'array' }],
    };
    expect(collapseCompositionSiblings(schema)).toEqual({
      title: 'Errors',
      oneOf: [{ type: 'string' }, { type: 'array' }],
    });
  });

  it('treats property names as names, not keywords', () => {
    const schema = {
      type: 'object',
      properties: {
        oneOf: { type: 'array', items: { type: 'string' } },
        type: { type: 'string' },
        items: { type: 'array', items: { type: 'string' } },
      },
    };
    expect(collapseCompositionSiblings(schema)).toEqual(schema);
  });

  it('keeps properties next to a class-level oneOf', () => {
    const schema = {
      properties: { a: { type: 'string' } },
      additionalProperties: false,
      oneOf: [{ required: ['a'] }, { required: ['b'] }],
    };
    expect(collapseCompositionSiblings(schema)).toEqual(schema);
  });

  it('leaves example payloads untouched', () => {
    const schema = {
      type: 'object',
      example: { oneOf: [1, 2], type: 'x', items: [] },
      default: { anyOf: [], format: 'y' },
    };
    expect(collapseCompositionSiblings(schema)).toEqual(schema);
  });
});

describe('buildComponentsSchemas', () => {
  const built = JSON.parse(JSON.stringify(buildComponentsSchemas()));

  it('matches the committed ComponentsSchemas (run `npm run build:schemas`)', () => {
    expect(built).toEqual(ComponentsSchemas);
  });

  it('keeps descriptions on $ref properties', () => {
    const props = built.TaxDetailsRequestDto.properties;
    for (const name of ['companyCountry', 'customerCountry']) {
      expect(props[name].$ref).toBe('#/components/schemas/CountryEnum');
      expect(props[name].description).toEqual(expect.any(String));
      expect(props[name].enum).toBeUndefined();
      expect(props[name].type).toBeUndefined();
    }
    expect(props.companyCountry.description).not.toBe(
      props.customerCountry.description,
    );
  });
});
