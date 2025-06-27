import { NotificationMessageTypeEnum } from '../../enums/notification/notification-message-type.enum';
import { InfoDto } from '../info.dto';
import { UnitDto } from '../unit.dto';

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

  /**
   * Defines the units for pay-per-use billing.
   * This allows the administrator to set a price for each unit per interval.
   * @example [{ id: "ram", unitDescription: "MB", intervalDescription: "month" }]
   */
  payPerUseUnits?: UnitDto[];
}
