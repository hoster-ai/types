import 'reflect-metadata';
import { validateBooleanFieldDto } from './boolean-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'bool-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Accept Terms' }],
  type: 'BOOLEAN',
  required: true,
  disabled: false,
};

describe('BooleanFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateBooleanFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a boolean value', () => {
      expect(
        validateBooleanFieldDto({ ...baseValidDto, value: true }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateBooleanFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error for wrong type literal', () => {
      const errors = validateBooleanFieldDto({ ...baseValidDto, type: 'TEXT' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('should return error for non-boolean value', () => {
      const errors = validateBooleanFieldDto({
        ...baseValidDto,
        value: 'true',
      });
      expect(errors.some((e) => e.property === 'value')).toBe(true);
    });
  });
});
