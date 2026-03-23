import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseResponse } from '../../base-response.dto';
import { ProductInfoDto } from '../product-info.dto';

/**
 * Represents the response containing product information.
 * This DTO extends the `BaseResponse` and includes the detailed product information.
 */
export class ProductInfoResponseDto extends BaseResponse {
  /**
   * The detailed information of the product.
   * This object contains all the attributes and settings of the product.
   */
  @ValidateNested()
  @Type(() => ProductInfoDto)
  @JSONSchema({
    title: 'Info',
    description: 'The detailed information of the product.',
    $ref: '#/components/schemas/ProductInfoDto',
  })
  info!: ProductInfoDto;
}
