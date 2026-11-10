import 'reflect-metadata';
import { validateAddonFieldDto } from './addon-field-validator';
import { LanguageEnum } from '../enums/language.enum';

const validField = {
  id: 'addon-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Addon Field' }],
  type: 'TEXT',
  required: true,
  disabled: false,
  value: 'test-value',
};

const baseValidDto = {
  field: validField,
};

describe('AddonFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateAddonFieldDto(baseValidDto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return error when the nested `field` is missing', () => {
      const errors = validateAddonFieldDto({});
      expect(errors.some((e) => e.property === 'field')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should surface errors from the nested field validator under `field`', () => {
      const errors = validateAddonFieldDto({
        field: { ...validField, type: 'NOT_REAL' },
      });
      const fieldErr = errors.find((e) => e.property === 'field');
      expect(fieldErr?.children?.some((c) => c.property === 'type')).toBe(true);
    });
  });

  describe('Undeclared properties', () => {
    it('should reject an unknown property on the wrapper', () => {
      const errors = validateAddonFieldDto({ ...baseValidDto, sticky: true });
      const err = errors.find((e) => e.property === 'sticky');
      expect(err?.constraints?.whitelistValidation).toBeDefined();
    });

    it('should reject an unknown property inside `field`', () => {
      const errors = validateAddonFieldDto({
        field: { ...validField, evil: 'x' },
      });
      const fieldErr = errors.find((e) => e.property === 'field');
      const evil = fieldErr?.children?.find((c) => c.property === 'evil');
      expect(evil?.constraints?.whitelistValidation).toBeDefined();
    });
  });
});
