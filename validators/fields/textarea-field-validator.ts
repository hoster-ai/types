import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TextareaFieldDto } from '../../dtos/fields/textarea-field.dto';

/**
 * Validates a TextareaFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a TextareaFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTextareaFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(TextareaFieldDto, data));
}
