import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';
import { EmailReceiverDto } from '../receiver/receiver-email.dto';
import { PushReceiverDto } from '../receiver/receiver-push.dto';
import { SmsReceiverDto } from '../receiver/receiver-sms.dto';
import { EmailSenderDto } from '../sender/sender-email.dto';
import { PushSenderDto } from '../sender/sender-push.dto';
import { SmsSenderDto } from '../sender/sender-sms.dto';

/**
 * Request payload for sending a notification.
 * Sent from hoster.ai to notification integrations (email, push, SMS).
 */
export class NotificationSendRequestDto {
  /** Unique identifier for the notification */
  @IsNotEmpty()
  @IsString()
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
  receiver!: EmailReceiverDto | PushReceiverDto | SmsReceiverDto;
}
