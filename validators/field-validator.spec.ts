import 'reflect-metadata';
import { validateFieldDto } from './field-validator';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { LanguageEnum } from '../enums/language.enum';

describe('FieldDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      id: 'test-id',
      label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
      value: 'test-value',
      type: FieldTypeEnum.TEXT_BOX,
      required: true,
      disabled: false,
      hidden: false,
      upgradeable: false,
    };

    const errors = validateFieldDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid type', () => {
    const invalidDto = {
      id: 'test-id',
      label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
      value: 'test-value',
      type: 'not-a-valid-type',
      required: true,
      disabled: false,
      hidden: false,
      upgradeable: false,
    };

    const errors = validateFieldDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'type')).toBe(true);
  });

  it('should return error for missing required fields', () => {
    const invalidDto = {
      // Missing required fields
    };

    const errors = validateFieldDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'id')).toBe(true);
    expect(errors.some((e) => e.property === 'label')).toBe(true);
    expect(errors.some((e) => e.property === 'value')).toBe(true);
    expect(errors.some((e) => e.property === 'type')).toBe(true);
    expect(errors.some((e) => e.property === 'required')).toBe(true);
    expect(errors.some((e) => e.property === 'disabled')).toBe(true);
    expect(errors.some((e) => e.property === 'hidden')).toBe(true);
  });

  it('should return no errors for valid DTO with optional error messages', () => {
    const validDto = {
      id: 'test-id',
      label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
      value: 'test-value',
      type: FieldTypeEnum.TEXT_BOX,
      required: true,
      disabled: false,
      hidden: false,
      upgradeable: false,
      regexValidationErrorMessage: [{ language: LanguageEnum.EN, text: 'Invalid format' }],
      remoteValidationErrorMessage: [{ language: LanguageEnum.EN, text: 'Invalid value' }],
    };

    const errors = validateFieldDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid regexValidationErrorMessage', () => {
    const invalidDto = {
      id: 'test-id',
      label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
      value: 'test-value',
      type: FieldTypeEnum.TEXT_BOX,
      required: true,
      disabled: false,
      hidden: false,
      upgradeable: false,
      regexValidationErrorMessage: 'not-an-array',
    };

    const errors = validateFieldDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'regexValidationErrorMessage')).toBe(true);
  });

  it('should return error for invalid remoteValidationErrorMessage', () => {
    const invalidDto = {
      id: 'test-id',
      label: [{ language: LanguageEnum.EN, text: 'Test Label' }],
      value: 'test-value',
      type: FieldTypeEnum.TEXT_BOX,
      required: true,
      disabled: false,
      hidden: false,
      upgradeable: false,
      remoteValidationErrorMessage: 'not-an-array',
    };

    const errors = validateFieldDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'remoteValidationErrorMessage')).toBe(true);
  });
});
