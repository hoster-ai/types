import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SmsReceiverDto } from '../dtos/notification/receiver/receiver-sms.dto';

/**
 * Validates a SmsReceiverDto object using class-validator decorators.
 *
 * @param data The object to validate as a SmsReceiverDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateSmsReceiverDto(data: object): ValidationError[] {
  const dto = plainToInstance(SmsReceiverDto, data);
  const errors = validateSync(dto);
  
  return errors;
}
