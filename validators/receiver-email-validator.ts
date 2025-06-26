import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EmailReceiverDto } from '../dtos/notification/receiver/receiver-email.dto';

/**
 * Validates a EmailReceiverDto object using class-validator decorators.
 *
 * @param data The object to validate as a EmailReceiverDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateEmailReceiverDto(data: object): ValidationError[] {
  const dto = plainToInstance(EmailReceiverDto, data);
  const errors = validateSync(dto);

  return errors;
}
