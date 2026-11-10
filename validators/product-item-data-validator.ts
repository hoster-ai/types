import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductItemDataDto } from '../dtos/product/product-item-data.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a ProductItemDataDto object using class-validator decorators.
 *
 * @param data The object to validate as a ProductItemDataDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateProductItemDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(ProductItemDataDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
