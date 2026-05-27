# validateUnitDto

**Description:** Validates a UnitDto object using class-validator decorators.

**Source:** `validators/unit.validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { UnitDto } from '../dtos/unit.dto';

export function validateUnitDto(data: object): ValidationError[] {
  const dto = plainToInstance(UnitDto, data);
  const errors = validateSync(dto);

  return errors;
}
```
