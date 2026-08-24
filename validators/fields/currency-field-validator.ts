import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CurrencyFieldDto } from '../../dtos/fields/currency-field.dto';

/**
 * Validates a CurrencyFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a CurrencyFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateCurrencyFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(CurrencyFieldDto, data));
}
