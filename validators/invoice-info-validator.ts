import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InvoiceInfoDto } from '../dtos/invoice/invoice-info.dto';

/**
 * Validates an InvoiceInfoDto object using class-validator decorators.
 *
 * @param data The object to validate as an InvoiceInfoDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateInvoiceInfoDto(data: object): ValidationError[] {
  const dto = plainToInstance(InvoiceInfoDto, data);
  const errors = validateSync(dto);

  return errors;
}
