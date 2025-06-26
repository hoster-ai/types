import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PushReceiverDto } from '../dtos/notification/receiver/receiver-push.dto';

/**
 * Validates a PushReceiverDto object using class-validator decorators.
 *
 * @param data The object to validate as a PushReceiverDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validatePushReceiverDto(data: object): ValidationError[] {
  const dto = plainToInstance(PushReceiverDto, data);
  const errors = validateSync(dto);

  return errors;
}
