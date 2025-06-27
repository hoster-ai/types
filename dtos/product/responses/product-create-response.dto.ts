import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

export class ProductCreateResponseDto extends BaseResponse {
  status!: ResponseStatusEnum;
  itemId!: string;
  data?: Record<string, unknown>;
}
