import { IsDefined, IsEnum } from "class-validator";
import { ProductItemActionsEnum } from "../../enums/item-actions.enum";
import { ItemDataDto } from "../item-data.dto";

export class ProductItemDataDto extends ItemDataDto {
  @IsDefined()
  @IsEnum(ProductItemActionsEnum)
  action!: ProductItemActionsEnum;
}