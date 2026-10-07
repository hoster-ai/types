# validateCreditNoteRequestDto

**Description:** Validates a CreditNoteRequestDto object: parent references, lines and totals, with nothing skipped.

**Source:** `validators/credit-note-request-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreditNoteRequestDto } from '../dtos/invoice/requests/credit-note-request.dto';

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
  const errors = validateSync(dto);

  return errors;
}
```
