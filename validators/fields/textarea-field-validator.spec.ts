import 'reflect-metadata';
import { validateTextareaFieldDto } from './textarea-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'ta-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Description' }],
  type: 'TEXTAREA',
  required: true,
  disabled: false,
};

describe('TextareaFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateTextareaFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional value and regex', () => {
      expect(
        validateTextareaFieldDto({
          ...baseValidDto,
          value: 'Hello world',
          minLength: 1,
          maxLength: 1000,
          regexValidation: '^.+$',
          regexValidationErrorMessage: [
            { language: LanguageEnum.ENGLISH, text: 'Must not be empty' },
          ],
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateTextareaFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error for wrong type literal', () => {
      const errors = validateTextareaFieldDto({
        ...baseValidDto,
        type: 'TEXT',
      });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('should return error for non-string value', () => {
      const errors = validateTextareaFieldDto({ ...baseValidDto, value: 42 });
      expect(errors.some((e) => e.property === 'value')).toBe(true);
    });
  });
});
