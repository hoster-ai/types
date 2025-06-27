import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { EmailReceiverDto } from './receiver/receiver-email.dto';
import { PushReceiverDto } from './receiver/receiver-push.dto';
import { SmsReceiverDto } from './receiver/receiver-sms.dto';
import { EmailSenderDto } from './sender/sender-email.dto';
import { PushSenderDto } from './sender/sender-push.dto';
import { SmsSenderDto } from './sender/sender-sms.dto';

export class NotificationSendRequestDto {
  /**
   * Unique identifier of the hoster message
   */
  @IsNotEmpty()
  @IsString()
  notificationId!: string;

  /**
   * Sender details according to the integration's notification type
   */
  @IsNotEmpty()
  @IsObject()
  sender!: EmailSenderDto | PushSenderDto | SmsSenderDto;

  /**
   * Recipient details according to the integration's notification type
   */
  @IsNotEmpty()
  @IsObject()
  receiver!: EmailReceiverDto | PushReceiverDto | SmsReceiverDto;
}
