import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Represents the response for a product upgradable check.
 * It indicates whether a product item is upgradable and may contain additional data.
 */
export class ProductUpgradableResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating success or failure.
   */
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item being checked.
   */
  itemId!: string;

  /**
   * Optional data associated with the upgradable check.
   * Can contain details about available upgrades or reasons for failure.
   * @optional
   */
  data?: Record<string, unknown>;
}
