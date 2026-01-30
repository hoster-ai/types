# validateProductInfoDto

**Description:** Validates a ProductInfoDto object using class-validator decorators.

**Source:** `validators/product-info.validator.ts`

**Language:** typescript

## Code

```typescript
import { plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";
import { ProductInfoDto } from '../dtos/product/product-info.dto';


export function validateProductInfoDto(data: object): ValidationError[] {
  const dto = plainToInstance(ProductInfoDto, data);
  const errors = validateSync(dto);

  return errors;
}
```

