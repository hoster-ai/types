import 'reflect-metadata';import { validateEmailReceiverDto } from './receiver-email-validator';

describe('EmailReceiverDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      to: 'test@example.com',
      cc: ['cc1@example.com', 'cc2@example.com'],
      bcc: ['bcc1@example.com', 'bcc2@example.com'],
    };

    const errors = validateEmailReceiverDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid email format', () => {
    const invalidDto = {
      to: 'not-an-email',
    };

    const errors = validateEmailReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'to')).toBe(true);
  });

  it('should return error for duplicate emails in cc', () => {
    const invalidDto = {
      to: 'test@example.com',
      cc: ['cc1@example.com', 'cc1@example.com'],
    };

    const errors = validateEmailReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'cc')).toBe(true);
  });
});
