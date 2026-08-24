# validateMultiSelectFieldDto

**Description:** Validates a MultiSelectFieldDto object using class-validator decorators.

**Source:** `validators/fields/multi-select-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { MultiSelectFieldDto } from '../../dtos/fields/multi-select-field.dto';

/**
 * Validates a MultiSelectFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a MultiSelectFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateMultiSelectFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(MultiSelectFieldDto, data));
}
```
