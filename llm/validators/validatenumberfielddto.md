# validateNumberFieldDto

**Description:** Validates a NumberFieldDto object using class-validator decorators.

**Source:** `validators/fields/number-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NumberFieldDto } from '../../dtos/fields/number-field.dto';

/**
 * Validates a NumberFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a NumberFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateNumberFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(NumberFieldDto, data));
}
```
