# ProductDowngradableResponseDto

**Description:** Represents the response for a product Downgradable check. It indicates whether a product item is Downgradable and may contain additional data.

**Source:** `dtos/product/responses/product-downgradable-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response for a product Downgradable check.
 * It indicates whether a product item is Downgradable and may contain additional data.
 */
export class ProductDowngradableResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating success or failure.
   */
  @JSONSchema({
    title: 'Status',
    description: 'The status of the response, indicating success or failure.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item being checked.
   */
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item being checked.',
    type: 'string',
  })
  itemId!: string;

  /**
   * Optional data associated with the Downgradable check.
   * Can contain details about available downgrades or reasons for failure.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the downgradable check.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
```
