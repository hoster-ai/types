import { validatePushReceiverDto } from './receiver-push-validator';

describe('PushReceiverDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      userId: 'test-user',
      deviceTokens: ['token1', 'token2'],
    };

    const errors = validatePushReceiverDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for missing userId', () => {
    const invalidDto = {
      deviceTokens: ['token1', 'token2'],
    };

    const errors = validatePushReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'userId')).toBe(true);
  });

  it('should return error for empty deviceTokens array', () => {
    const invalidDto = {
      userId: 'test-user',
      deviceTokens: [],
    };

    const errors = validatePushReceiverDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'deviceTokens')).toBe(true);
  });
});
