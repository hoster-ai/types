# validateBooleanFieldDto

**Description:** Validates a BooleanFieldDto object using class-validator decorators.

**Source:** `validators/fields/boolean-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { BooleanFieldDto } from '../../dtos/fields/boolean-field.dto';

/**
 * Validates a BooleanFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a BooleanFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateBooleanFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(BooleanFieldDto, data));
}
```
