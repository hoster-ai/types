import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AttributeFieldDto } from '../dtos/attribute-field.dto';
import { validateAnyFieldDto } from './any-field-validator';

/**
 * Validates an AttributeFieldDto object using class-validator decorators.
 *
 * The nested `field` (a discriminated `AnyFieldDto`) is validated separately
 * by dispatching to the matching concrete DTO's validator; its errors are
 * merged into the returned list under the `field` property.
 *
 * @param data The object to validate as an AttributeFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateAttributeFieldDto(data: object): ValidationError[] {
  const dto = plainToInstance(AttributeFieldDto, data);
  const errors = validateSync(dto);

  const field = (data as { field?: unknown })?.field;
  if (field && typeof field === 'object') {
    const fieldErrors = validateAnyFieldDto(field as object);
    if (fieldErrors.length > 0) {
      const wrapped = new ValidationError();
      wrapped.property = 'field';
      wrapped.value = field;
      wrapped.children = fieldErrors;
      errors.push(wrapped);
    }
  }

  return errors;
}
