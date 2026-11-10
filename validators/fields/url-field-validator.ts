import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UrlFieldDto } from '../../dtos/fields/url-field.dto';
import { STRICT_VALIDATION_OPTIONS } from '../validation-options';

/**
 * Validates a UrlFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a UrlFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateUrlFieldDto(data: object): ValidationError[] {
  return validateSync(
    plainToInstance(UrlFieldDto, data),
    STRICT_VALIDATION_OPTIONS,
  );
}
