import 'reflect-metadata';
import { validateNotificationRequestDto } from './notification-request-validator';

const validSender = {
  __type: 'email',
  fullName: 'Test Sender',
  subject: 'Hello',
  message: 'Hello world',
};
const validReceiver = { __type: 'email', to: 'recipient@example.com' };

describe('NotificationRequestDto Validator', () => {
  // Valid test case
  it('should return no errors for valid DTO', () => {
    const validDto = {
      notificationId: 'test-notification-123',
      sender: {
        __type: 'email',
        fullName: 'Test Sender',
        subject: 'Hello',
        message: 'Hello world',
      },
      receiver: {
        __type: 'email',
        to: 'recipient@example.com',
      },
    };

    const errors = validateNotificationRequestDto(validDto);
    expect(errors).toHaveLength(0);
  });

  // Invalid test cases
  describe('notificationId validation', () => {
    it('should return error when notificationId is missing', () => {
      const invalidDto = {
        sender: validSender,
        receiver: validReceiver,
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('notificationId');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should return error when notificationId is not a string', () => {
      const invalidDto = {
        notificationId: 123, // Number instead of string
        sender: validSender,
        receiver: validReceiver,
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
        receiver: validReceiver,
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
        receiver: validReceiver,
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
        receiver: validReceiver,
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
        sender: validSender,
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should return error when receiver is not an object', () => {
      const invalidDto = {
        notificationId: 'test-notification-123',
        sender: validSender,
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
        sender: validSender,
        receiver: null,
      };

      const errors = validateNotificationRequestDto(invalidDto);

      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('isObject');
    });
  });

  describe('__type discriminator', () => {
    it('should accept every sender/receiver variant', () => {
      const variants = [
        {
          sender: validSender,
          receiver: validReceiver,
        },
        {
          sender: {
            __type: 'push',
            messageId: 'm1',
            userId: 'u1',
            title: 'Hi',
            message: 'Hello',
          },
          receiver: { __type: 'push', userId: 'u1', deviceTokens: ['t1'] },
        },
        {
          sender: {
            __type: 'sms',
            senderPhone: '+306900000000',
            message: 'Hi',
          },
          receiver: { __type: 'sms', receiverPhones: ['+306900000001'] },
        },
      ];
      for (const v of variants) {
        expect(
          validateNotificationRequestDto({ notificationId: 'n1', ...v }),
        ).toHaveLength(0);
      }
    });

    it('should not strip __type from the caller input', () => {
      const dto = {
        notificationId: 'n1',
        sender: { ...validSender },
        receiver: { ...validReceiver },
      };
      validateNotificationRequestDto(dto);
      expect(dto.sender.__type).toBe('email');
      expect(validateNotificationRequestDto(dto)).toHaveLength(0);
    });

    it('should return error when sender has no __type', () => {
      const errors = validateNotificationRequestDto({
        notificationId: 'n1',
        sender: { ...validSender, __type: undefined },
        receiver: validReceiver,
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('sender');
      expect(errors[0].constraints).toHaveProperty('hasKnownType');
    });

    it('should return error when receiver has an unknown __type', () => {
      const errors = validateNotificationRequestDto({
        notificationId: 'n1',
        sender: validSender,
        receiver: { ...validReceiver, __type: 'fax' },
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].constraints).toHaveProperty('hasKnownType');
    });

    it('should validate the nested variant picked by __type', () => {
      const errors = validateNotificationRequestDto({
        notificationId: 'n1',
        sender: validSender,
        receiver: { __type: 'email', to: 'not-an-email' },
      });
      expect(errors).toHaveLength(1);
      expect(errors[0].property).toBe('receiver');
      expect(errors[0].children?.length).toBeGreaterThan(0);
    });
  });
});
