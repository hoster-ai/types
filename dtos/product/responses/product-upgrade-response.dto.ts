import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response after attempting to upgrade a product.
 * It confirms the status of the upgrade operation.
 */
export class ProductUpgradeResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the upgrade.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item that was upgraded.
   */
  itemId!: string;

  /**
   * Optional data associated with the upgrade response.
   * This could include details about the new subscription or other relevant information.
   * @optional
   */
  data?: Record<string, unknown>;
}
