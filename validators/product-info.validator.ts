import { plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";
import { ProductInfoDto } from '../dtos/product/product-info.dto';


export function validateProductInfoDto(data: object): ValidationError[] {
  const dto = plainToInstance(ProductInfoDto, data);
  const errors = validateSync(dto);

  return errors;
}