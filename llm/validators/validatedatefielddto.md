# validateDateFieldDto

**Description:** Validates a DateFieldDto object using class-validator decorators.

**Source:** `validators/fields/date-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { DateFieldDto } from '../../dtos/fields/date-field.dto';

/**
 * Validates a DateFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a DateFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateDateFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(DateFieldDto, data));
}
```
