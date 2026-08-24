import 'reflect-metadata';
import { validateAnyFieldDto } from './any-field-validator';
import { LanguageEnum } from '../enums/language.enum';

const minimalBase = (type: string) => ({
  id: 'x',
  label: [{ language: LanguageEnum.ENGLISH, text: 'X' }],
  type,
  required: true,
  disabled: false,
});

describe('AnyField dispatcher', () => {
  it('routes a TEXT payload to TextFieldDto validation', () => {
    expect(validateAnyFieldDto(minimalBase('TEXT'))).toHaveLength(0);
  });

  it('routes a NUMBER payload to NumberFieldDto validation', () => {
    expect(validateAnyFieldDto(minimalBase('NUMBER'))).toHaveLength(0);
  });

  it('returns a synthetic type error when discriminator is missing', () => {
    const errors = validateAnyFieldDto({ id: 'x' });
    expect(errors.some((e) => e.property === 'type')).toBe(true);
  });

  it('returns a synthetic type error when discriminator is unknown', () => {
    const errors = validateAnyFieldDto({
      ...minimalBase('NOT_REAL'),
    });
    expect(errors.some((e) => e.property === 'type')).toBe(true);
  });

  it('propagates type-specific validation errors from the concrete DTO', () => {
    const errors = validateAnyFieldDto({
      ...minimalBase('PHONE'),
      value: 'not-a-phone',
    });
    expect(errors.some((e) => e.property === 'value')).toBe(true);
  });

  // Regression: the discriminator lookup used `type in FIELD_DTO_CLASSES`, which
  // walks the prototype chain. Inherited names resolved to built-ins such as
  // Function.prototype.toString (no `.prototype`), so plainToInstance threw an
  // uncaught TypeError instead of returning a validation error.
  describe('inherited Object.prototype names are not valid discriminators', () => {
    const inheritedNames = [
      'constructor',
      'toString',
      'valueOf',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      '__proto__',
      '__defineGetter__',
    ];

    it.each(inheritedNames)('rejects type=%s without throwing', (type) => {
      const run = () => validateAnyFieldDto({ ...minimalBase(type) });
      expect(run).not.toThrow();
      expect(run().some((e) => e.property === 'type')).toBe(true);
    });
  });
});
