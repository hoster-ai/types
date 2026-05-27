# ProductCreateResponseDto

**Description:** Represents the response after attempting to create a product. It confirms the status of the creation operation.

**Source:** `dtos/product/responses/product-create-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to create a product.
 * It confirms the status of the creation operation.
 */
export class ProductCreateResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the creation.
   */
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the creation.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was created.
   */
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was created.',
    type: 'string',
  })
  itemId!: string;

  /**
   * Optional data associated with the creation response.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the creation response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
```
