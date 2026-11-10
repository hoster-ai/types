import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SmsSenderDto } from '../dtos/notification/sender/sender-sms.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a SmsSenderDto object using class-validator decorators.
 *
 * @param data The object to validate as a SmsSenderDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateSmsSenderDto(data: object): ValidationError[] {
  const dto = plainToInstance(SmsSenderDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
