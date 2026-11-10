# validateTINValidationDetailsDto

**Description:** Validates a TINValidationDetails object using class-validator decorators.

**Source:** `validators/tin-validation-details-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { TINValidationDetails } from '../dtos/invoice/tin-validation-details.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a TINValidationDetails object using class-validator decorators.
 *
 * @param data The object to validate as a TINValidationDetails.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateTINValidationDetailsDto(
  data: object,
): ValidationError[] {
  const dto = plainToInstance(TINValidationDetails, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
```
