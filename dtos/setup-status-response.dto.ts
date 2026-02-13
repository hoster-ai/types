import { SetupStatusEnum } from '../enums/setup-status.enum';
import { BaseResponse } from './base-response.dto';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for setup status response.
 * Extends the base response to include the setup status.
 */
export class SetupStatusResponseDto extends BaseResponse {
  /**
   * The status of the setup process.
   * @see SetupStatusEnum
   */
  @JSONSchema({
    title: 'Status',
    description: 'The status of the setup process.',
    type: 'string',
    enum: Object.values(SetupStatusEnum),
  })
  status!: SetupStatusEnum;
}
