# ProductUpgradeResponseDto

**Description:** Represents the response after attempting to upgrade a product. It confirms the status of the upgrade operation.

**Source:** `dtos/product/responses/product-upgrade-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to upgrade a product.
 * It confirms the status of the upgrade operation.
 */
export class ProductUpgradeResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the upgrade.
   */
  @JSONSchema({
    title: 'Status',
    description: 'The status of the response, indicating the outcome of the upgrade.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was upgraded.
   */
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was upgraded.',
    type: 'string',
  })
  itemId!: string;

  /**
   * Optional data associated with the upgrade response.
   * This could include details about the new subscription or other relevant information.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the upgrade response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
```

