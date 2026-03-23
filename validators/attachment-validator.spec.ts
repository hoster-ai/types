import 'reflect-metadata';
import { validateAttachmentDto } from './attachment-validator';

const baseValidDto = {
  filename: 'document.pdf',
  content: 'SGVsbG8gV29ybGQ=', // "Hello World" in base64
};

describe('AttachmentDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateAttachmentDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional contentType', () => {
      const dto = { ...baseValidDto, contentType: 'application/pdf' };
      expect(validateAttachmentDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateAttachmentDto({});
      expect(errors.some((e) => e.property === 'filename')).toBe(true);
      expect(errors.some((e) => e.property === 'content')).toBe(true);
    });

    it('should return error when filename is missing', () => {
      const dto = { content: 'SGVsbG8=' };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'filename')).toBe(true);
    });

    it('should return error when content is missing', () => {
      const dto = { filename: 'test.pdf' };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'content')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty filename', () => {
      const dto = { ...baseValidDto, filename: '' };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'filename')).toBe(true);
    });

    it('should return error for empty content', () => {
      const dto = { ...baseValidDto, content: '' };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'content')).toBe(true);
    });

    it('should return error for non-base64 content', () => {
      const dto = { ...baseValidDto, content: 'not-valid-base64!!!' };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'content')).toBe(true);
    });

    it('should return error for non-string contentType', () => {
      const dto = { ...baseValidDto, contentType: 123 };
      const errors = validateAttachmentDto(dto);
      expect(errors.some((e) => e.property === 'contentType')).toBe(true);
    });
  });
});
