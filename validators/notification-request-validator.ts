import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NotificationRequestDto } from '../dtos/notification/notification-request.dto';

/**
 * Validates a NotificationRequestDto object using class-validator decorators.
 *
 * @param data The object to validate as a NotificationRequestDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateNotificationRequestDto(
  data: object,
): ValidationError[] {
  const dto = plainToInstance(NotificationRequestDto, data);
  const errors = validateSync(dto);

  return errors;
}
