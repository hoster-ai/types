import { BaseResponse } from './base-response.dto';
import { IntegrationInfoDto } from './integration-info.dto';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO for information response
 * Extends the base response class and adds integration information
 */
export class InfoResponseDto extends BaseResponse {
  /**
   * integration information
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => IntegrationInfoDto)
  info: IntegrationInfoDto;
}
