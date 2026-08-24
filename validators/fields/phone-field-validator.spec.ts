import 'reflect-metadata';
import { validatePhoneFieldDto } from './phone-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'phone-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Phone' }],
  type: 'PHONE',
  required: true,
  disabled: false,
};

describe('PhoneFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validatePhoneFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a canonical E.164 value', () => {
      expect(
        validatePhoneFieldDto({ ...baseValidDto, value: '+14155552671' }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validatePhoneFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: '14155552671' }, 'value'],
      [{ ...baseValidDto, value: '+1 415 555 2671' }, 'value'],
      [{ ...baseValidDto, value: 'not-a-phone' }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validatePhoneFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
