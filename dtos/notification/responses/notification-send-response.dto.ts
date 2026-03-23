import { IsString, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { SuccessResponseDto } from '../../success-response.dto';

/**
 * Response from notification integrations after successfully sending a notification.
 * Returned to hoster.ai confirming the notification was sent.
 */
export class NotificationSendResponseDto extends SuccessResponseDto {
  /** Unique identifier for the sent notification */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Notification ID',
    description: 'Unique identifier for the sent notification.',
    type: 'string',
  })
  notificationId!: string;
}
