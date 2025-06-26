import { NotificationMessageTypeEnum } from '../../enums/notification/notification-message-type.enum';
import { InfoDto } from '../info.dto';

/**
 * DTO for notification information.
 * Extends the base InfoDto to include the notification message type.
 */
export class NotificationInfoDto extends InfoDto {
  /**
   * The type of the notification message.
   * @see NotificationMessageTypeEnum
   */
  type!: NotificationMessageTypeEnum;
}
