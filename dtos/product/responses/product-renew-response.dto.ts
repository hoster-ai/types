import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response after attempting to renew a product.
 * It confirms the status of the renewal operation.
 */
export class ProductRenewResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the renewal.
   */
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the renewal.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was renewed.
   */
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item that was renewed.',
    type: 'string',
  })
  itemId!: string;

  /**
   * Optional data associated with the renewal response.
   * @optional
   */
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the renewal response.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
