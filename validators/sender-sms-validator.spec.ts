import 'reflect-metadata';
import { validateSmsSenderDto } from './sender-sms-validator';

describe('SmsSenderDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      senderPhone: '+12015550123',
      message: 'Test Message',
    };

    const errors = validateSmsSenderDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid phone number', () => {
    const invalidDto = {
      senderPhone: 'not-a-phone-number',
      message: 'Test Message',
    };

    const errors = validateSmsSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'senderPhone')).toBe(true);
  });

  it('should return error for missing message', () => {
    const invalidDto = {
      senderPhone: '+11234567890',
      // Missing message
    };

    const errors = validateSmsSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'message')).toBe(true);
  });
});
