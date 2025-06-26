import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EmailSenderDto } from '../dtos/notification/sender/sender-email.dto';

/**
 * Validates a EmailSenderDto object using class-validator decorators.
 *
 * @param data The object to validate as a EmailSenderDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateEmailSenderDto(data: object): ValidationError[] {
  const dto = plainToInstance(EmailSenderDto, data);
  const errors = validateSync(dto);

  return errors;
}
