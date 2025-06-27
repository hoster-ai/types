import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to create a product.
 * It confirms the status of the creation operation.
 */
export class ProductCreateResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the creation.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was created.
   */
  itemId!: string;

  /**
   * Optional data associated with the creation response.
   * @optional
   */
  data?: Record<string, unknown>;
}
