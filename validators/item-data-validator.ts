import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ItemDataDto } from '../dtos/item-data.dto';

/**
 * Validates an ItemDataDto object using class-validator decorators.
 *
 * @param data The object to validate as an ItemDataDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateItemDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(ItemDataDto, data);
  const errors = validateSync(dto);

  return errors;
}
