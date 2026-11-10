import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PushSenderDto } from '../dtos/notification/sender/sender-push.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a PushSenderDto object using class-validator decorators.
 *
 * @param data The object to validate as a PushSenderDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validatePushSenderDto(data: object): ValidationError[] {
  const dto = plainToInstance(PushSenderDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
