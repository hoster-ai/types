import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FieldDto } from '../dtos/field.dto';

/**
 * Validates a FieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a FieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateFieldDto(data: object): ValidationError[] {
  const dto = plainToInstance(FieldDto, data);
  const errors = validateSync(dto);

  return errors;
}
