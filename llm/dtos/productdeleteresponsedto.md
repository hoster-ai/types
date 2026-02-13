# ProductDeleteResponseDto

**Description:** Represents the response after attempting to delete a product. It confirms the status of the deletion operation.

**Source:** `dtos/product/responses/product-delete-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to delete a product.
 * It confirms the status of the deletion operation.
 */
export class ProductDeleteResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the deletion.
   */
  @JSONSchema({
    title: 'Status',
    description: 'The status of the response, indicating the outcome of the deletion.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was deleted.
   */
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was deleted.',
    type: 'string',
  })
  itemId!: string;

  /**
   * Optional data associated with the deletion response.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the deletion response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
```

