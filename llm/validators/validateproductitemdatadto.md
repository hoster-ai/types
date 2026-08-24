# validateProductItemDataDto

**Description:** Validates a ProductItemDataDto object using class-validator decorators.

**Source:** `validators/product-item-data-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductItemDataDto } from '../dtos/product/product-item-data.dto';

/**
 * Validates a ProductItemDataDto object using class-validator decorators.
 *
 * @param data The object to validate as a ProductItemDataDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateProductItemDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(ProductItemDataDto, data);
  const errors = validateSync(dto);

  return errors;
}
```
