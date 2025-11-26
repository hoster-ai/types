import 'reflect-metadata';
import { validateFieldDto } from './field-validator';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { LanguageEnum } from '../enums/language.enum';

const baseValidDto = {
  id: 'test-id',
  label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
  value: 'test-value',
  type: FieldTypeEnum.TEXT_BOX,
  required: true,
  disabled: false,
  visibleInOrder: false,
  visibleInClientPanel: false,
  upgradable: false,
};

describe('FieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors for a valid DTO with optional error messages', () => {
      const dto = {
        ...baseValidDto,
        regexValidationErrorMessage: [{ language: LanguageEnum.EN, text: 'Invalid format' }],
        remoteValidationErrorMessage: [{ language: LanguageEnum.EN, text: 'Invalid value' }],
      };
      expect(validateFieldDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields (except upgradable)', () => {
      const errors = validateFieldDto({});
      const requiredProps = ['id', 'label', 'value', 'type', 'required', 'disabled', 'visibleInOrder', 'visibleInClientPanel'];
      for (const prop of requiredProps) {
        expect(errors.some(e => e.property === prop)).toBe(true);
      }
    });

    it('should return error if value is missing', () => {
      const dto = { ...baseValidDto };
      delete (dto as any).value;
      const errors = validateFieldDto(dto);
      expect(errors.some(e => e.property === 'value')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'not-a-valid-type' }, 'type'],
      [{}, 'id'],
      [{ ...baseValidDto, regexValidation: 'regex', regexValidationErrorMessage: 'not-an-array' }, 'regexValidationErrorMessage'],
      [{ ...baseValidDto, triggersRemoteValidation: true, remoteValidationErrorMessage: 'not-an-array' }, 'remoteValidationErrorMessage'],
    ])('should return error for invalid %s', (dto, expectedProp) => {
      const errors = validateFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.property === expectedProp)).toBe(true);
    });
  });

  describe('Invalid `value` field', () => {
    it.each([
      [true, 'boolean'],
      [null, 'null'],
      [undefined, 'undefined'],
      [{}, 'object'],
      [[], 'array'],
    ])('should return error if value is invalid type (%s)', (invalidValue, _label) => {
      const dto = { ...baseValidDto, value: invalidValue };
      const errors = validateFieldDto(dto);
      expect(errors.some(e => e.property === 'value')).toBe(true);
    });

    it('should return error if value is empty string when required', () => {
      const dto = { ...baseValidDto, value: '' };
      const errors = validateFieldDto(dto);
      expect(errors.some(e => e.property === 'value')).toBe(true);
    });
  });

  describe('Repeatable constraints (AllOrNone and Min<=Max)', () => {
    it('should fail when only repeatableMin is present', () => {
      const dto = { ...baseValidDto, repeatableMin: 1 } as any;
      const errors = validateFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
      // Class-level error; ensure at least one constraint exists
      expect(errors.some(e => e.constraints && (e.constraints['AllOrNone'] || Object.values(e.constraints!).some(msg => (msg as string).includes('All of'))))).toBe(true);
    });

    it('should fail when only repeatableMax is present', () => {
      const dto = { ...baseValidDto, repeatableMax: 2 } as any;
      const errors = validateFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.constraints && (e.constraints['AllOrNone'] || Object.values(e.constraints!).some(msg => (msg as string).includes('All of'))))).toBe(true);
    });

    it('should pass when both present and repeatableMin <= repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 1, repeatableMax: 2 } as any;
      const errors = validateFieldDto(dto);
      expect(errors).toHaveLength(0);
    });

    it('should fail when both present and repeatableMin > repeatableMax', () => {
      const dto = { ...baseValidDto, repeatableMin: 3, repeatableMax: 2 } as any;
      const errors = validateFieldDto(dto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.constraints && (e.constraints['MinLessOrEqualMax'] || Object.values(e.constraints!).some(msg => (msg as string).includes('must be less than or equal'))))).toBe(true);
    });
  });
});
