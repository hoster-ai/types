import { IsDefined, IsEnum } from "class-validator";
import { ProductItemActionsEnum } from "../../enums/item-actions.enum";
import { ItemDataDto } from "../item-data.dto";

/**
 * Product item data sent to product integrations.
 * Uses product-specific actions distinct from invoice integration actions.
 */
export class ProductItemDataDto extends ItemDataDto {
  /** Product-specific action type for this item */
  @IsDefined()
  @IsEnum(ProductItemActionsEnum)
  action!: ProductItemActionsEnum;
}