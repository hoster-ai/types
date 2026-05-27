import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PhoneFieldDto } from '../../dtos/fields/phone-field.dto';

/**
 * Validates a PhoneFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a PhoneFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validatePhoneFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(PhoneFieldDto, data));
}
