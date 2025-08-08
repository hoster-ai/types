import { validate } from 'class-validator';
import { ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NotificationInfoDto } from '../dtos/notification/notification-info.dto';

/**
 * Validates a NotificationInfoDto object.
 * @param dto The NotificationInfoDto object to validate.
 * @returns A promise resolving to an array of validation errors, if any.
 */
export async function validateNotificationInfoDto(dto: object): Promise<ValidationError[]> {
    const notificationInfoDto = plainToInstance(NotificationInfoDto, dto);
    const errors = await validate(notificationInfoDto);
    return errors;
}
