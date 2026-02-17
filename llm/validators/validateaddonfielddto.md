# validateAddonFieldDto

**Description:** Validates an AddonFieldDto object. Since AddonFieldDto is an empty subclass of FieldDto, this delegates to validateFieldDto.

**Source:** `validators/addon-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { ValidationError } from 'class-validator';
import { validateFieldDto } from './field-validator';

/**
 * Validates an AddonFieldDto object.
 * Since AddonFieldDto is an empty subclass of FieldDto, this delegates to validateFieldDto.
 *
 * @param data The object to validate as an AddonFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateAddonFieldDto(data: object): ValidationError[] {
  return validateFieldDto(data);
}
```

