import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EmailFieldDto } from '../../dtos/fields/email-field.dto';
import { STRICT_VALIDATION_OPTIONS } from '../validation-options';

/**
 * Validates an EmailFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as an EmailFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateEmailFieldDto(data: object): ValidationError[] {
  return validateSync(
    plainToInstance(EmailFieldDto, data),
    STRICT_VALIDATION_OPTIONS,
  );
}
