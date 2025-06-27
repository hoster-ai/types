import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to suspend a product.
 * It confirms the status of the suspend operation.
 */
export class ProductSuspendResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the suspend operation.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was suspended.
   */
  itemId!: string;

  /**
   * Optional data associated with the suspend response.
   * @optional
   */
  data?: Record<string, unknown>;
}
