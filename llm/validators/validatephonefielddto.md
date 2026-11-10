# validatePhoneFieldDto

**Description:** Validates a PhoneFieldDto object using class-validator decorators.

**Source:** `validators/fields/phone-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { PhoneFieldDto } from '../../dtos/fields/phone-field.dto';
import { STRICT_VALIDATION_OPTIONS } from '../validation-options';

/**
 * Validates a PhoneFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a PhoneFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validatePhoneFieldDto(data: object): ValidationError[] {
  return validateSync(
    plainToInstance(PhoneFieldDto, data),
    STRICT_VALIDATION_OPTIONS,
  );
}
```
