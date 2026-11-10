import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CountryDto } from '../dtos/country.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a CountryDto object using class-validator decorators.
 *
 * @param data The object to validate as a CountryDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateCountryDto(data: object): ValidationError[] {
  const dto = plainToInstance(CountryDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
