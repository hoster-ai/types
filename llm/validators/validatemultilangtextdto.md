# validateMultilangTextDto

**Description:** Validates a MultilangTextDto object using class-validator decorators.

**Source:** `validators/multilang-text-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { MultilangTextDto } from '../dtos/multilang-text.dto';

/**
 * Validates a MultilangTextDto object using class-validator decorators.
 *
 * @param data The object to validate as a MultilangTextDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateMultilangTextDto(data: object): ValidationError[] {
  const dto = plainToInstance(MultilangTextDto, data);
  const errors = validateSync(dto);

  return errors;
}
```
