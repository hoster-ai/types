import 'reflect-metadata';
import { validateTextFieldDto } from './text-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'text-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Username' }],
  type: 'TEXT',
  required: true,
  disabled: false,
};

describe('TextFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateTextFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional value, min/max length and regex', () => {
      const dto = {
        ...baseValidDto,
        value: 'abc',
        minLength: 1,
        maxLength: 10,
        regexValidation: '^[a-z]+$',
        regexValidationErrorMessage: [
          { language: LanguageEnum.ENGLISH, text: 'Lowercase only' },
        ],
      };
      expect(validateTextFieldDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateTextFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXTAREA' }, 'type'],
      [{ ...baseValidDto, value: 123 }, 'value'],
      [{ ...baseValidDto, minLength: -1 }, 'minLength'],
      [{ ...baseValidDto, maxLength: 'ten' }, 'maxLength'],
      [{ ...baseValidDto, regexValidation: '[' }, 'regexValidation'],
      [
        {
          ...baseValidDto,
          regexValidation: '^x$',
          regexValidationErrorMessage: 'not-an-array',
        },
        'regexValidationErrorMessage',
      ],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateTextFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
