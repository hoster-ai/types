import { SetupStatusEnum } from '../enums/setup-status.enum';
import { BaseResponse } from './base-response.dto';

/**
 * DTO for setup status response.
 * Extends the base response to include the setup status.
 */
export class SetupStatusResponseDto extends BaseResponse {
  /**
   * The status of the setup process.
   * @see SetupStatusEnum
   */
  status!: SetupStatusEnum;
}
