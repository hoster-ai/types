import 'reflect-metadata';
import { validateAttributeFieldDto } from './attribute-field-validator';
import { LanguageEnum } from '../enums/language.enum';

const validField = {
  id: 'attr-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'CPU Cores' }],
  type: 'NUMBER',
  required: true,
  disabled: false,
  value: 4,
};

const baseValidDto = {
  field: validField,
};

describe('AttributeFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO with only field', () => {
      expect(validateAttributeFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional visibleInOrder and visibleInClientPanel', () => {
      const dto = {
        ...baseValidDto,
        visibleInOrder: true,
        visibleInClientPanel: false,
      };
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

  describe('Missing required fields', () => {
    it('should return error when the nested `field` is missing', () => {
      const errors = validateAttributeFieldDto({});
      expect(errors.some((e) => e.property === 'field')).toBe(true);
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
      expect(errors.some((e) => e.property === 'visibleInOrder')).toBe(true);
    });

    it('should return error for non-boolean visibleInClientPanel', () => {
      const dto = { ...baseValidDto, visibleInClientPanel: 1 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some((e) => e.property === 'visibleInClientPanel')).toBe(
        true,
      );
    });

    it('should return error for non-number repeatableMin', () => {
      const dto = { ...baseValidDto, repeatableMin: 'one', repeatableMax: 5 };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some((e) => e.property === 'repeatableMin')).toBe(true);
    });

    it('should return error for non-number repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 1, repeatableMax: 'five' };
      const errors = validateAttributeFieldDto(dto);
      expect(errors.some((e) => e.property === 'repeatableMax')).toBe(true);
    });
  });

  describe('Nested field validation', () => {
    it('should surface errors from the nested field validator under `field`', () => {
      const errors = validateAttributeFieldDto({
        field: { ...validField, type: 'NUMBER', value: 'four' },
      });
      const fieldErr = errors.find((e) => e.property === 'field');
      expect(fieldErr).toBeDefined();
      expect(fieldErr?.children?.some((c) => c.property === 'value')).toBe(
        true,
      );
    });

    it('should surface a type error when nested type literal is unknown', () => {
      const errors = validateAttributeFieldDto({
        field: { ...validField, type: 'NOT_REAL' },
      });
      const fieldErr = errors.find((e) => e.property === 'field');
      expect(fieldErr?.children?.some((c) => c.property === 'type')).toBe(true);
    });
  });
});
