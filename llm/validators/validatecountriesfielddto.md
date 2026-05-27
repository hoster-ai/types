# validateCountriesFieldDto

**Description:** Validates a CountriesFieldDto object using class-validator decorators.

**Source:** `validators/fields/countries-field-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CountriesFieldDto } from '../../dtos/fields/countries-field.dto';

/**
 * Validates a CountriesFieldDto object using class-validator decorators.
 *
 * @param data The object to validate as a CountriesFieldDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateCountriesFieldDto(data: object): ValidationError[] {
  return validateSync(plainToInstance(CountriesFieldDto, data));
}
```
