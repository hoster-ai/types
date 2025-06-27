import { BaseResponse } from '../../base-response.dto';
import { FieldDto } from '../../field.dto';

export class ProductValidateAttributesResponseDto extends BaseResponse {
  validatedAttributes!: FieldDto[];
}
