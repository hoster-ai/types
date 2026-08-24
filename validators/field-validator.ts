import { ValidationError } from 'class-validator';
import { validateAnyFieldDto } from './any-field-validator';

/**
 * @deprecated Use `validateAnyFieldDto` (or a concrete per-type validator like
 * `validateTextFieldDto`) instead. Kept for one release for backward compatibility.
 */
export function validateFieldDto(data: object): ValidationError[] {
  return validateAnyFieldDto(data);
}
