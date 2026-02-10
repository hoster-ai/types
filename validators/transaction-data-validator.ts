import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TransactionData } from '../dtos/invoice/transaction-data.dto';

/**
 * Validates a TransactionData object using class-validator decorators.
 *
 * @param data The object to validate as a TransactionData.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTransactionDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(TransactionData, data);
  const errors = validateSync(dto);

  return errors;
}
