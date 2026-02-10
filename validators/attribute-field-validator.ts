import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AttributeFieldDto } from '../dtos/attribute-field.dto';

/**
 * Validates an AttributeFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as an AttributeFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateAttributeFieldDto(data: object): ValidationError[] {
  const dto = plainToInstance(AttributeFieldDto, data);
  const errors = validateSync(dto);

  return errors;
}
