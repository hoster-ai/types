import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to downgrade a product.
 * It confirms the status of the downgrade operation.
 */
export class ProductDowngradeResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the downgrade.
   */
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the downgrade.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was downgraded.
   */
  @JSONSchema({
    title: 'Item ID',
    description:
      'The unique identifier of the product item that was downgraded.',
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
   * Optional data associated with the downgrade response.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the downgrade response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
