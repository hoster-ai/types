# validateCreditNoteResponseDto

**Description:** Validates a credit note response object.

**Source:** `validators/credit-note-response-validator.ts`

**Language:** typescript

## Code

```typescript
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreditNoteResponseDto } from '../dtos/invoice/responses/credit-note-response.dto';

/**
 * Validates a credit note response object.
 *
 * The core needs this for the deferred hook: that hook's request body IS this
 * response DTO. Nothing is skipped: `status` and `outboxId` are what let the core settle and
 * correlate the report, so a report without them is unusable. Issue #27.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateCreditNoteResponseDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const response = plainToInstance(CreditNoteResponseDto, plainObject);
  return await validate(response);
};
```
