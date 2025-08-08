import 'reflect-metadata';
import { validateSmsSenderDto } from './sender-sms-validator';

describe('SmsSenderDto Validator', () => {
  const validDto = {
    senderPhone: '+12015550123',
    message: 'Test Message',
  };

  it('should return no errors for valid DTO', () => {
    expect(validateSmsSenderDto(validDto)).toHaveLength(0);
  });

  it.each([
    [{ senderPhone: 'not-a-phone-number', message: 'Test Message' }, 'senderPhone'],
    [{ senderPhone: '+11234567890' }, 'message'],
    [{ message: 'Test Message' }, 'senderPhone'],
  ])('should return error for invalid %s', (dto, expectedProp) => {
    const errors = validateSmsSenderDto(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === expectedProp)).toBe(true);
  });
});
