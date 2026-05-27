import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TextFieldDto } from '../../dtos/fields/text-field.dto';

/**
 * Validates a TextFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a TextFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTextFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(TextFieldDto, data));
}
