import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to renew a product.
 * It confirms the status of the renewal operation.
 */
export class ProductRenewResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the renewal.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was renewed.
   */
  itemId!: string;

  /**
   * Optional data associated with the renewal response.
   * @optional
   */
  data?: Record<string, unknown>;
}
