# validateInfoDto

**Description:** Validates an InfoDto object using class-validator decorators.

**Source:** `validators/info-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { InfoDto } from '../dtos/info.dto';

/**
 * Validates an InfoDto object using class-validator decorators.
 *
 * @param data The object to validate as an InfoDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateInfoDto(data: object): ValidationError[] {
  const dto = plainToInstance(InfoDto, data);
  const errors = validateSync(dto);

  return errors;
}
```

