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
    description:
      'The status of the response, indicating the outcome of the deletion.',
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
   * The outbox action identifier, echoed verbatim from the `X-Idempotency-Key`
   * header sent by the core. Used for correlation and anti-replay when the
   * action completes synchronously or later via a pending hook.
   */
  @JSONSchema({
    title: 'Outbox ID',
    description:
      'The outbox action identifier, echoed verbatim from the X-Idempotency-Key header sent by the core, used for correlation and anti-replay.',
    type: 'string',
  })
  outboxId!: string;

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
