import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FIELD_DTO_CLASSES } from '../dtos/fields/any-field.dto';

/**
 * Validates any field DTO by reading the string-literal `type` discriminator and
 * routing to the matching concrete DTO's validation.
 *
 * @param data Object with a string `type` discriminator.
 * @returns ValidationError[] from the concrete DTO, or a synthetic error if
 *   `type` is missing or not a recognized literal.
 */
export function validateAnyFieldDto(data: object): ValidationError[] {
  const type = (data as { type?: unknown })?.type;

  if (typeof type !== 'string' || !(type in FIELD_DTO_CLASSES)) {
    const err = new ValidationError();
    err.property = 'type';
    err.value = type;
    err.constraints = {
      isFieldType: `type must be one of: ${Object.keys(FIELD_DTO_CLASSES).join(', ')}`,
    };
    return [err];
  }

  const Cls = FIELD_DTO_CLASSES[
    type as keyof typeof FIELD_DTO_CLASSES
  ] as new () => object;
  return validateSync(plainToInstance(Cls, data));
}
