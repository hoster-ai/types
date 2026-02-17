import 'reflect-metadata';
import { validateTabDto } from './tab-validator';

const baseValidDto = {
  label: 'Settings',
  url: 'https://example.com/settings',
};

describe('TabDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateTabDto(baseValidDto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateTabDto({});
      expect(errors.some(e => e.property === 'label')).toBe(true);
      expect(errors.some(e => e.property === 'url')).toBe(true);
    });

    it('should return error when label is missing', () => {
      const dto = { url: 'https://example.com/settings' };
      const errors = validateTabDto(dto);
      expect(errors.some(e => e.property === 'label')).toBe(true);
    });

    it('should return error when url is missing', () => {
      const dto = { label: 'Settings' };
      const errors = validateTabDto(dto);
      expect(errors.some(e => e.property === 'url')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty label', () => {
      const dto = { ...baseValidDto, label: '' };
      const errors = validateTabDto(dto);
      expect(errors.some(e => e.property === 'label')).toBe(true);
    });

    it('should return error for non-https URL', () => {
      const dto = { ...baseValidDto, url: 'http://example.com/settings' };
      const errors = validateTabDto(dto);
      expect(errors.some(e => e.property === 'url')).toBe(true);
    });

    it('should return error for invalid URL', () => {
      const dto = { ...baseValidDto, url: 'not-a-url' };
      const errors = validateTabDto(dto);
      expect(errors.some(e => e.property === 'url')).toBe(true);
    });
  });
});
