import 'reflect-metadata';
import { validateAddonFieldDto } from './addon-field-validator';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { LanguageEnum } from '../enums/language.enum';

const baseValidDto = {
  id: 'addon-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Addon Field' }],
  value: 'test-value',
  type: FieldTypeEnum.TEXT_BOX,
  required: true,
  disabled: false,
  upgradable: false,
};

describe('AddonFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateAddonFieldDto(baseValidDto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateAddonFieldDto({});
      const requiredProps = [
        'id',
        'label',
        'value',
        'type',
        'required',
        'disabled',
      ];
      for (const prop of requiredProps) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid type enum', () => {
      const dto = { ...baseValidDto, type: 'not-a-valid-type' };
      const errors = validateAddonFieldDto(dto);
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });
  });
});
