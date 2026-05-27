import 'reflect-metadata';
import { validateDateFieldDto } from './date-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'date-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Start Date' }],
  type: 'DATE',
  required: true,
  disabled: false,
};

describe('DateFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateDateFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with an ISO 8601 value', () => {
      expect(
        validateDateFieldDto({
          ...baseValidDto,
          value: '2026-05-26T10:30:00Z',
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateDateFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: '26/05/2026' }, 'value'],
      [{ ...baseValidDto, value: 'not a date' }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateDateFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
