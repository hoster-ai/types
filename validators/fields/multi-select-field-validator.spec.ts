import 'reflect-metadata';
import { validateMultiSelectFieldDto } from './multi-select-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'msel-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Features' }],
  type: 'MULTI_SELECT',
  required: true,
  disabled: false,
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
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateMultiSelectFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
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
  });
});
