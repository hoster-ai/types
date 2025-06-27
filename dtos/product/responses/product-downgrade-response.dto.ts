import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to downgrade a product.
 * It confirms the status of the downgrade operation.
 */
export class ProductDowngradeResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the downgrade.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was downgraded.
   */
  itemId!: string;

  /**
   * Optional data associated with the downgrade response.
   * @optional
   */
  data?: Record<string, unknown>;
}
