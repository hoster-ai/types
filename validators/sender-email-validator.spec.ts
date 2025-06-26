import 'reflect-metadata';
import { validateEmailSenderDto } from './sender-email-validator';

describe('EmailSenderDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      fullName: 'Test Sender',
      subject: 'Test Subject',
      message: 'Test Message',
    };

    const errors = validateEmailSenderDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for missing fields', () => {
    const invalidDto = {
      // Missing all fields
    };

    const errors = validateEmailSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'fullName')).toBe(true);
    expect(errors.some((e) => e.property === 'subject')).toBe(true);
    expect(errors.some((e) => e.property === 'message')).toBe(true);
  });

  it('should return error for message length too long', () => {
    const invalidDto = {
      fullName: 'Test Sender',
      subject: 'Test Subject',
      message: 'a'.repeat(50001),
    };

    const errors = validateEmailSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'message')).toBe(true);
  });
});
