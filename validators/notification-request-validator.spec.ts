import 'reflect-metadata';
import { validateNotificationRequestDto } from './notification-request-validator';

describe('NotificationRequestDto Validator', () => {
  // Valid test case
  it('should return no errors for valid DTO', () => {
    const validDto = {
      notificationId: 'test-notification-123',
      sender: {
        // Using EmailSenderDto as an example
        email: 'test@example.com',
        name: 'Test Sender',
      },
      receiver: {
        // Using EmailReceiverDto as an example
        email: 'recipient@example.com',
      },
    };

    const errors = validateNotificationRequestDto(validDto);
    expect(errors).toHaveLength(0);
  });

  // Invalid test cases
  describe('notificationId validation', () => {
    it('should return error when notificationId is missing', () => {
      const invalidDto = {
        sender: { email: 'test@example.com', name: 'Test Sender' },
        receiver: { email: 'recipient@example.com' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('notificationId');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should return error when notificationId is not a string', () => {
      const invalidDto = {
        notificationId: 123, // Number instead of string
        sender: { email: 'test@example.com', name: 'Test Sender' },
        receiver: { email: 'recipient@example.com' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('notificationId');
      expect(errors[0].constraints).toHaveProperty('isString');
    });
  });

  describe('sender validation', () => {
    it('should return error when sender is missing', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        receiver: { email: 'recipient@example.com' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('sender');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should return error when sender is not an object', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: 'not-an-object',
        receiver: { email: 'recipient@example.com' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('sender');
      expect(errors[0].constraints).toHaveProperty('isObject');
    });

    it('should return error when sender is null', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: null,
        receiver: { email: 'recipient@example.com' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('sender');
      expect(errors[0].constraints).toHaveProperty('isObject');
    });
  });

  describe('receiver validation', () => {
    it('should return error when receiver is missing', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: { email: 'test@example.com', name: 'Test Sender' },
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should return error when receiver is not an object', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: { email: 'test@example.com', name: 'Test Sender' },
        receiver: 'invalid-receiver',
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('isObject');
    });

    it('should return error when receiver is null', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: { email: 'test@example.com', name: 'Test Sender' },
        receiver: null,
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('isObject');
    });
  });
});
