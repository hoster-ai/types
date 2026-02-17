import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TabDto } from '../dtos/tab.dto';

/**
 * Validates a TabDto object using class-validator decorators.
 *
 * @param data The object to validate as a TabDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTabDto(data: object): ValidationError[] {
  const dto = plainToInstance(TabDto, data);
  const errors = validateSync(dto);

  return errors;
}
