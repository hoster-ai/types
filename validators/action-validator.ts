import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ActionDto } from '../dtos/action.dto';

/**
 * Validates a ActionDto object using class-validator decorators.
 *
 * @param data The object to validate as a ActionDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateActionDto(data: object): ValidationError[] {
  const dto = plainToInstance(ActionDto, data);
  const errors = validateSync(dto);

  return errors;
}
