import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { EmailSenderDto } from '../sender/sender-email.dto';
import { PushSenderDto } from '../sender/sender-push.dto';
import { SmsSenderDto } from '../sender/sender-sms.dto';
import { EmailReceiverDto } from '../receiver/receiver-email.dto';
import { PushReceiverDto } from '../receiver/receiver-push.dto';
import { SmsReceiverDto } from '../receiver/receiver-sms.dto';

/**
 * Request payload for sending a notification.
 * Sent from hoster.ai to notification integrations (email, push, SMS).
 */
export class NotificationSendRequestDto {
  /** Unique identifier for the notification */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Notification ID',
    description: 'Unique identifier for the notification.',
    type: 'string',
  })
  notificationId!: string;

  /** Sender details (type depends on integration: email, push, or SMS) */
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: EmailSenderDto, name: 'email' },
        { value: PushSenderDto, name: 'push' },
        { value: SmsSenderDto, name: 'sms' },
      ],
    },
    keepDiscriminatorProperty: false,
  })
  @JSONSchema({
    title: 'Sender',
    description:
      'Sender details (type depends on integration: email, push, or SMS).',
    oneOf: [
      { $ref: '#/components/schemas/EmailSenderDto' },
      { $ref: '#/components/schemas/PushSenderDto' },
      { $ref: '#/components/schemas/SmsSenderDto' },
    ],
  })
  sender!: EmailSenderDto | PushSenderDto | SmsSenderDto;

  /** Recipient details (type depends on integration: email, push, or SMS) */
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => Object, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: EmailReceiverDto, name: 'email' },
        { value: PushReceiverDto, name: 'push' },
        { value: SmsReceiverDto, name: 'sms' },
      ],
    },
    keepDiscriminatorProperty: false,
  })
  @JSONSchema({
    title: 'Receiver',
    description:
      'Recipient details (type depends on integration: email, push, or SMS).',
    oneOf: [
      { $ref: '#/components/schemas/EmailReceiverDto' },
      { $ref: '#/components/schemas/PushReceiverDto' },
      { $ref: '#/components/schemas/SmsReceiverDto' },
    ],
  })
  receiver!: EmailReceiverDto | PushReceiverDto | SmsReceiverDto;
}
