import 'reflect-metadata';
import { validateMultiSelectFieldDto } from './multi-select-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'msel-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Features' }],
  type: 'MULTI_SELECT',
  required: true,
  disabled: false,
  options: [
    { key: 'ssl', value: 'SSL' },
    { key: 'backups', value: 'Backups' },
  ],
};

describe('MultiSelectFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateMultiSelectFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid options value', () => {
      expect(
        validateMultiSelectFieldDto({
          ...baseValidDto,
          value: [
            { key: 'ssl', value: 'SSL' },
            { key: 'backups', value: 'Backups' },
          ],
        }),
      ).toHaveLength(0);
    });

    it('should return no errors with min/max selections', () => {
      expect(
        validateMultiSelectFieldDto({
          ...baseValidDto,
          minSelections: 1,
          maxSelections: 2,
        }),
      ).toHaveLength(0);
    });

    it('should accept minSelections equal to maxSelections', () => {
      expect(
        validateMultiSelectFieldDto({
          ...baseValidDto,
          minSelections: 2,
          maxSelections: 2,
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateMultiSelectFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled', 'options']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error when options is an empty array', () => {
      const errors = validateMultiSelectFieldDto({
        ...baseValidDto,
        options: [],
      });
      expect(errors.some((e) => e.property === 'options')).toBe(true);
    });

    it('should return error when an option is missing its key', () => {
      const errors = validateMultiSelectFieldDto({
        ...baseValidDto,
        options: [{ value: 'No Key' }],
      });
      expect(errors.some((e) => e.property === 'options')).toBe(true);
    });

    it('should return error for wrong type literal', () => {
      const errors = validateMultiSelectFieldDto({
        ...baseValidDto,
        type: 'SELECT',
      });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('should return error when value is not an array', () => {
      const errors = validateMultiSelectFieldDto({
        ...baseValidDto,
        value: { key: 'a', value: 'A' },
      });
      expect(errors.some((e) => e.property === 'value')).toBe(true);
    });

    it('should return error when minSelections exceeds maxSelections', () => {
      const errors = validateMultiSelectFieldDto({
        ...baseValidDto,
        minSelections: 3,
        maxSelections: 1,
      });
      expect(errors.length).toBeGreaterThan(0);
    });

    it.each([
      [{ ...baseValidDto, minSelections: -1 }, 'minSelections'],
      [{ ...baseValidDto, minSelections: 1.5 }, 'minSelections'],
      [{ ...baseValidDto, maxSelections: 'two' }, 'maxSelections'],
    ])(
      'should return error for invalid selection bounds %#',
      (dto, expectedProp) => {
        const errors = validateMultiSelectFieldDto(dto);
        expect(errors.some((e) => e.property === expectedProp)).toBe(true);
      },
    );
  });
});
