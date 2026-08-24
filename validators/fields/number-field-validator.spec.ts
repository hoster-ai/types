import 'reflect-metadata';
import { validateNumberFieldDto } from './number-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'num-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'CPU Cores' }],
  type: 'NUMBER',
  required: true,
  disabled: false,
};

describe('NumberFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateNumberFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with value, min, max, integer', () => {
      expect(
        validateNumberFieldDto({
          ...baseValidDto,
          value: 4,
          min: 1,
          max: 16,
          integer: true,
        }),
      ).toHaveLength(0);
    });

    it('should return no errors when min equals max', () => {
      expect(
        validateNumberFieldDto({ ...baseValidDto, min: 5, max: 5 }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateNumberFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 'four' }, 'value'],
      [{ ...baseValidDto, min: 'one' }, 'min'],
      [{ ...baseValidDto, max: 'two' }, 'max'],
      [{ ...baseValidDto, integer: 'yes' }, 'integer'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateNumberFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });

    it('should return error when min is greater than max', () => {
      const errors = validateNumberFieldDto({
        ...baseValidDto,
        min: 10,
        max: 5,
      });
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
