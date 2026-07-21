import 'reflect-metadata';
import { validatePasswordFieldDto } from './password-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'pwd-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Password' }],
  type: 'PASSWORD',
  required: true,
  disabled: false,
};

describe('PasswordFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validatePasswordFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with value and minLength', () => {
      expect(
        validatePasswordFieldDto({
          ...baseValidDto,
          value: 's3cret!',
          minLength: 6,
        }),
      ).toHaveLength(0);
    });

    it('should return no errors with remote validation trigger and message', () => {
      expect(
        validatePasswordFieldDto({
          ...baseValidDto,
          triggersRemoteValidation: true,
          remoteValidationErrorMessage: [
            { language: LanguageEnum.ENGLISH, text: 'Password rejected' },
          ],
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validatePasswordFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error when minLength exceeds maxLength', () => {
      const errors = validatePasswordFieldDto({
        ...baseValidDto,
        minLength: 10,
        maxLength: 5,
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should accept minLength equal to maxLength', () => {
      expect(
        validatePasswordFieldDto({
          ...baseValidDto,
          minLength: 5,
          maxLength: 5,
        }),
      ).toHaveLength(0);
    });

    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 1234 }, 'value'],
      [{ ...baseValidDto, minLength: -1 }, 'minLength'],
      [
        { ...baseValidDto, remoteValidationErrorMessage: 'not-an-array' },
        'remoteValidationErrorMessage',
      ],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validatePasswordFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
