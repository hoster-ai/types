# validateSelectFieldDto

**Description:** Validates a SelectFieldDto object using class-validator decorators.

**Source:** `validators/fields/select-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SelectFieldDto } from '../../dtos/fields/select-field.dto';

/**
 * Validates a SelectFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a SelectFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateSelectFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(SelectFieldDto, data));
}
```
