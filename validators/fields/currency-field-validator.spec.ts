import 'reflect-metadata';
import { validateCurrencyFieldDto } from './currency-field-validator';
import { LanguageEnum } from '../../enums/language.enum';
import { CurrencyEnum } from '../../enums/currency.enum';

const baseValidDto = {
  id: 'cur-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Currency' }],
  type: 'CURRENCY',
  required: true,
  disabled: false,
};

describe('CurrencyFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateCurrencyFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid ISO 4217 value', () => {
      expect(
        validateCurrencyFieldDto({ ...baseValidDto, value: CurrencyEnum.EUR }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateCurrencyFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 'XXX' }, 'value'],
      [{ ...baseValidDto, value: 42 }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateCurrencyFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
