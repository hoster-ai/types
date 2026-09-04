import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents the response for a product Downgradable check.
 * It indicates whether a product item is Downgradable and may contain additional data.
 */
export class ProductDowngradableResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating success or failure.
   */
  @IsEnum(ResponseStatusEnum)
  @JSONSchema({
    title: 'Status',
    description: 'The status of the response, indicating success or failure.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The unique identifier of the product item being checked.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Item ID',
    description: 'The unique identifier of the product item being checked.',
    type: 'string',
  })
  itemId?: string;

  /**
   * Optional data associated with the Downgradable check.
   * Can contain details about available downgrades or reasons for failure.
   * @optional
   */
  @IsOptional()
  @IsObject()
  @JSONSchema({
    title: 'Data',
    description: 'Optional data associated with the downgradable check.',
    type: 'object',
    additionalProperties: true,
  })
  data?: Record<string, unknown>;
}
