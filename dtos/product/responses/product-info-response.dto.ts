import { BaseResponse } from '../../base-response.dto';
import { ProductInfoDto } from '../product-info.dto';

export class ProductInfoResponseDto extends BaseResponse {
  info!: ProductInfoDto;
}
