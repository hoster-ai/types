import { validateSmsReceiverDto } from './receiver-sms-validator';

describe('SmsReceiverDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      receiverPhones: ['+12015550123', '+442071234567'],
    };

    const errors = validateSmsReceiverDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid phone number', () => {
    const invalidDto = {
      receiverPhones: ['not-a-phone-number'],
    };

    const errors = validateSmsReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'receiverPhones')).toBe(true);
  });

  it('should return error for duplicate phone numbers', () => {
    const invalidDto = {
      receiverPhones: ['+11234567890', '+11234567890'],
    };

    const errors = validateSmsReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'receiverPhones')).toBe(true);
  });
});
