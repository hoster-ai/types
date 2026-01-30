# ValidateAttributesResponseDto

**Description:** Represents the response from validating product attributes. Contains the list of attributes that have been validated.

**Source:** `dtos/product/responses/product-validate-attributes-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { BaseResponse } from '../../base-response.dto';
import { FieldDto } from '../../field.dto';

/**
 * Represents the response from validating attributes.
 * Contains the list of attributes that have been validated.
 */
export class ValidateAttributesResponseDto extends BaseResponse {
  /**
   * An array of field DTOs representing the validated attributes.
   * Each `FieldDto` contains details about a single attribute.
   */
  validatedAttributes!: FieldDto[];
}
```

