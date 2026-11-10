import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreditNoteRequestDto } from '../dtos/invoice/requests/credit-note-request.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a CreditNoteRequestDto object using class-validator decorators.
 *
 * Nothing is skipped: the parent references and the totals hold for every
 * consumer, whatever its own validation options.
 *
 * @param data The object to validate as a CreditNoteRequestDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateCreditNoteRequestDto(data: object): ValidationError[] {
  const dto = plainToInstance(CreditNoteRequestDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
