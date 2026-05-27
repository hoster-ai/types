import 'reflect-metadata';
import { validateEmailFieldDto } from './email-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'email-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Email' }],
  type: 'EMAIL',
  required: true,
  disabled: false,
};

describe('EmailFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateEmailFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid email value', () => {
      expect(
        validateEmailFieldDto({
          ...baseValidDto,
          value: 'foo@example.com',
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateEmailFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 'not-an-email' }, 'value'],
      [{ ...baseValidDto, value: 42 }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateEmailFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
