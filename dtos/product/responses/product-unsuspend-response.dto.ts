import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to unsuspend a product.
 * It confirms the status of the unsuspend operation.
 */
export class ProductUnsuspendResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the unsuspend operation.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was unsuspended.
   */
  itemId!: string;

  /**
   * Optional data associated with the unsuspend response.
   * @optional
   */
  data?: Record<string, unknown>;
}
