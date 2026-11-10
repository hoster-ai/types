import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EmailSenderDto } from '../dtos/notification/sender/sender-email.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a EmailSenderDto object using class-validator decorators.
 *
 * @param data The object to validate as a EmailSenderDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateEmailSenderDto(data: object): ValidationError[] {
  const dto = plainToInstance(EmailSenderDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
