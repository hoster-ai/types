import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InvoiceItemDataDto } from '../dtos/invoice/invoice-item-data.dto';

/**
 * Validates an InvoiceItemDataDto object using class-validator decorators.
 *
 * @param data The object to validate as an InvoiceItemDataDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateInvoiceItemDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(InvoiceItemDataDto, data);
  const errors = validateSync(dto);

  return errors;
}
