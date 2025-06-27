import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to delete a product.
 * It confirms the status of the deletion operation.
 */
export class ProductDeleteResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the deletion.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was deleted.
   */
  itemId!: string;

  /**
   * Optional data associated with the deletion response.
   * @optional
   */
  data?: Record<string, unknown>;
}
