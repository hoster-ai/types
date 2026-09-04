# ProductCreateResponseDto

**Description:** Represents the response after attempting to create a product. It confirms the status of the creation operation.

**Source:** `dtos/product/responses/product-create-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to create a product.
 * It confirms the status of the creation operation.
 */
export class ProductCreateResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the creation.
   */
  @IsEnum(ResponseStatusEnum)
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the creation.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was created, in the integration's own
   * system. Optional: the core correlates on `outboxId`, never on this.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was created.',
    type: 'string',
  })
  itemId?: string;

  /**
   * The outbox action identifier, echoed verbatim from the `X-Idempotency-Key`
   * header sent by the core. Used for correlation and anti-replay when the
   * action completes synchronously or later via a pending hook.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Outbox ID',
    description:
      'The outbox action identifier, echoed verbatim from the X-Idempotency-Key header sent by the core, used for correlation and anti-replay.',
    type: 'string',
  })
  outboxId!: string;

  /**
   * Optional data associated with the creation response.
   * @optional
   */
  @IsOptional()
  @IsObject()
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the creation response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
```
