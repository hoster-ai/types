import { validateSync } from 'class-validator';
import { ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NotificationInfoDto } from '../dtos/notification/notification-info.dto';

/**
 * Validates a NotificationInfoDto object.
 * @param dto The NotificationInfoDto object to validate.
 * @returns An array of validation errors, if any.
 */
export function validateNotificationInfoDto(dto: object): ValidationError[] {
    const notificationInfoDto = plainToInstance(NotificationInfoDto, dto);
    const errors = validateSync(notificationInfoDto);
    return errors;
}
