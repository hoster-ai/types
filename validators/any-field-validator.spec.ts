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
});
