import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InvoiceContactData } from '../dtos/invoice-contact-data.dto';

/**
 * Validates an InvoiceContactData object using class-validator decorators.
 *
 * @param data The object to validate as an InvoiceContactData.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateInvoiceContactDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(InvoiceContactData, data);
  const errors = validateSync(dto);

  return errors;
}
