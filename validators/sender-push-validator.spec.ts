import { validatePushSenderDto } from './sender-push-validator';

describe('PushSenderDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      messageId: 'test-message-id',
      userId: 'test-user-id',
      title: 'Test Title',
      message: 'Test Message',
    };

    const errors = validatePushSenderDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for missing fields', () => {
    const invalidDto = {
      // Missing all fields
    };

    const errors = validatePushSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'messageId')).toBe(true);
    expect(errors.some((e) => e.property === 'userId')).toBe(true);
    expect(errors.some((e) => e.property === 'title')).toBe(true);
    expect(errors.some((e) => e.property === 'message')).toBe(true);
  });

  it('should return error for message length too long', () => {
    const invalidDto = {
      messageId: 'test-message-id',
      userId: 'test-user-id',
      title: 'Test Title',
      message: 'a'.repeat(1001),
    };

    const errors = validatePushSenderDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'message')).toBe(true);
  });
});
