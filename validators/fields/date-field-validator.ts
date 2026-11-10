import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DateFieldDto } from '../../dtos/fields/date-field.dto';
import { STRICT_VALIDATION_OPTIONS } from '../validation-options';

/**
 * Validates a DateFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a DateFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateDateFieldDto(data: object): ValidationError[] {
  return validateSync(
    plainToInstance(DateFieldDto, data),
    STRICT_VALIDATION_OPTIONS,
  );
}
