import 'reflect-metadata';
import { validateSelectFieldDto } from './select-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'sel-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Plan' }],
  type: 'SELECT',
  required: true,
  disabled: false,
};

describe('SelectFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateSelectFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid option value', () => {
      expect(
        validateSelectFieldDto({
          ...baseValidDto,
          value: { key: 'basic', value: 'Basic' },
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateSelectFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error for wrong type literal', () => {
      const errors = validateSelectFieldDto({ ...baseValidDto, type: 'TEXT' });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('should return error for option missing required key', () => {
      const errors = validateSelectFieldDto({
        ...baseValidDto,
        value: { value: 'No Key' },
      });
      expect(errors.some((e) => e.property === 'value')).toBe(true);
    });
  });
});
