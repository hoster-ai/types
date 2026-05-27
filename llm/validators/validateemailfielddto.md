# validateEmailFieldDto

**Description:** Validates an EmailFieldDto object using class-validator decorators.

**Source:** `validators/fields/email-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { EmailFieldDto } from '../../dtos/fields/email-field.dto';

/**
 * Validates an EmailFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as an EmailFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateEmailFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(EmailFieldDto, data));
}
```
