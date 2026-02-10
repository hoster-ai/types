import 'reflect-metadata';
import { validateAttributeFieldDto } from './attribute-field-validator';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { LanguageEnum } from '../enums/language.enum';

const baseValidDto = {
  id: 'attr-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'CPU Cores' }],
  value: '4',
  type: FieldTypeEnum.TEXT_BOX,
  required: true,
  disabled: false,
  upgradable: false,
};

describe('AttributeFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO (inherited fields only)', () => {
      expect(validateAttributeFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional visibleInOrder and visibleInClientPanel', () => {
      const dto = { ...baseValidDto, visibleInOrder: true, visibleInClientPanel: false };
      expect(validateAttributeFieldDto(dto)).toHaveLength(0);
    });

    it('should return no errors with both repeatableMin and repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 1, repeatableMax: 5 };
      expect(validateAttributeFieldDto(dto)).toHaveLength(0);
    });

    it('should return no errors when repeatableMin equals repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 3, repeatableMax: 3 };
      expect(validateAttributeFieldDto(dto)).toHaveLength(0);
    });
  });

  describe('AllOrNone constraint on repeatableMin/repeatableMax', () => {
    it('should return error when only repeatableMin is provided', () => {
      const dto = { ...baseValidDto, repeatableMin: 1 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should return error when only repeatableMax is provided', () => {
      const dto = { ...baseValidDto, repeatableMax: 5 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('MinLessOrEqual constraint on repeatableMin/repeatableMax', () => {
    it('should return error when repeatableMin is greater than repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 10, repeatableMax: 5 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for non-boolean visibleInOrder', () => {
      const dto = { ...baseValidDto, visibleInOrder: 'yes' };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some(e => e.property === 'visibleInOrder')).toBe(true);
    });

    it('should return error for non-boolean visibleInClientPanel', () => {
      const dto = { ...baseValidDto, visibleInClientPanel: 1 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some(e => e.property === 'visibleInClientPanel')).toBe(true);
    });

    it('should return error for non-number repeatableMin', () => {
      const dto = { ...baseValidDto, repeatableMin: 'one', repeatableMax: 5 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some(e => e.property === 'repeatableMin')).toBe(true);
    });

    it('should return error for non-number repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 1, repeatableMax: 'five' };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some(e => e.property === 'repeatableMax')).toBe(true);
    });
  });

  describe('Inherited FieldDto validation', () => {
    it('should return errors when inherited required fields are missing', () => {
      const errors = validateAttributeFieldDto({});
      const requiredProps = ['id', 'label', 'value', 'type', 'required', 'disabled'];
      for (const prop of requiredProps) {
        expect(errors.some(e => e.property === prop)).toBe(true);
      }
    });
  });
});
