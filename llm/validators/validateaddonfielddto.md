# validateAddonFieldDto

**Description:** Validates an AddonFieldDto. The nested .field (a discriminated AnyFieldDto) is validated separately via validateAnyFieldDto and its errors are merged under the 'field' property.

**Source:** `validators/addon-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AddonFieldDto } from '../dtos/addon-field.dto';
import { validateAnyFieldDto } from './any-field-validator';

/**
 * Validates an AddonFieldDto object.
 *
 * The nested `field` (a discriminated `AnyFieldDto`) is validated separately
 * via the dispatcher; its errors are merged into the returned list under the
 * `field` property.
 *
 * @param data The object to validate as an AddonFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateAddonFieldDto(data: object): ValidationError[] {
  const dto = plainToInstance(AddonFieldDto, data);
  const errors = validateSync(dto);

  const field = (data as { field?: unknown })?.field;
  if (field && typeof field === 'object') {
    const fieldErrors = validateAnyFieldDto(field as object);
    if (fieldErrors.length > 0) {
      const wrapped = new ValidationError();
      wrapped.property = 'field';
      wrapped.value = field;
      wrapped.children = fieldErrors;
      errors.push(wrapped);
    }
  }

  return errors;
}
```
