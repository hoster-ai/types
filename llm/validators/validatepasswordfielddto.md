# validatePasswordFieldDto

**Description:** Validates a PasswordFieldDto object using class-validator decorators.

**Source:** `validators/fields/password-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PasswordFieldDto } from '../../dtos/fields/password-field.dto';

/**
 * Validates a PasswordFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a PasswordFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validatePasswordFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(PasswordFieldDto, data));
}
```
