import { IsEnum, IsDefined, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { NotificationMessageTypeEnum } from '../../enums/notification/notification-message-type.enum';
import { InfoDto } from '../info.dto';
import { UnitDto } from '../unit.dto';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for notification information.
 * Extends the base InfoDto to include the notification message type.
 */
export class NotificationInfoDto extends InfoDto {
  /**
   * The type of the notification message.
   * @see NotificationMessageTypeEnum
   */
  @IsEnum(NotificationMessageTypeEnum)
  @IsDefined()
  @JSONSchema({ 
    title: 'Notification Type', 
    description: 'Notification channel type.', 
    type: 'string', 
    enum: Object.values(NotificationMessageTypeEnum), 
    example: Object.values(NotificationMessageTypeEnum)[0] 
  })
  type!: NotificationMessageTypeEnum;

  /**
   * Defines the units for pay-per-use billing.
   * This allows the administrator to set a price for each unit per interval.
   * @example [{ id: "ram", unitDescription: "MB", intervalDescription: "month" }]
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  @JSONSchema({
    title: 'Pay-Per-Use Units',
    description: 'Optional metering units for pay-per-use billing.',
    type: 'array',
    items: { $ref: '#/components/schemas/UnitDto' },
    example: [
      { id: 'messages', unitDescription: 'Message sent', intervalDescription: 'Per month' }
    ]
  })
  payPerUseUnits?: UnitDto[];
}
