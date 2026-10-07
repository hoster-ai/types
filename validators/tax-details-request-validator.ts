import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TaxDetailsRequestDto } from '../dtos/tax-manager/tax-details-request.dto';

/**
 * Validates a TaxDetailsRequestDto object using class-validator decorators.
 *
 * Use it rather than a hand-rolled `validateSync`, so every consumer applies
 * the same options.
 *
 * @param data The object to validate as a TaxDetailsRequestDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTaxDetailsRequestDto(data: object): ValidationError[] {
  const dto = plainToInstance(TaxDetailsRequestDto, data);
  const errors = validateSync(dto);

  return errors;
}
