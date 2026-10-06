import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ErrorResponseDto } from './error-response.dto';
import { ComponentsSchemas } from '../openapi/schemas/components.schemas';

type PropertySchemas = { properties: Record<string, Record<string, unknown>> };

const failingProperties = async (plain: Record<string, unknown>) =>
  (await validate(plainToInstance(ErrorResponseDto, plain))).map(
    (e) => e.property,
  );

describe('ErrorResponseDto (#36)', () => {
  it.each([
    ['a single message', { code: 400, errors: 'x' }],
    ['an array of messages', { code: 400, errors: ['x', 'y'] }],
    ['no errors at all', { code: 500 }],
  ])('accepts %s', async (_label, plain) => {
    expect(await failingProperties(plain)).toEqual([]);
  });

  it.each([
    ['a number as errors', { code: 400, errors: 5 }, 'errors'],
    ['an array of numbers as errors', { code: 400, errors: [1] }, 'errors'],
    ['an object as errors', { code: 400, errors: { a: 'x' } }, 'errors'],
    ['a string code', { code: '400', errors: 'x' }, 'code'],
    ['a fractional code', { code: 400.5, errors: 'x' }, 'code'],
    ['a missing code', { errors: 'x' }, 'code'],
  ])('rejects %s', async (_label, plain, property) => {
    expect(await failingProperties(plain)).toEqual([property]);
  });

  it('emits errors as a clean oneOf with no sibling type/items', () => {
    const schema = ComponentsSchemas.ErrorResponseDto as PropertySchemas;
    expect(schema.properties.errors).toEqual({
      title: 'Errors',
      description:
        'A developer-friendly error message or an array of messages.',
      oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
    });
  });

  it('emits code as an integer', () => {
    const schema = ComponentsSchemas.ErrorResponseDto as PropertySchemas;
    expect(schema.properties.code.type).toBe('integer');
    expect(schema.properties.code.minLength).toBeUndefined();
  });
});
