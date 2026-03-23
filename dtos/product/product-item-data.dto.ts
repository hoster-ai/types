import { IsEnum, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { ProductActionsEnum } from '../../enums/item-actions.enum';
import { ItemDataDto } from '../item-data.dto';

/**
 * Product item data sent to product integrations.
 * Uses product-specific actions distinct from invoice integration actions.
 */
export class ProductItemDataDto extends ItemDataDto {
  /** Product-specific action type for this item */
  @IsOptional()
  @IsEnum(ProductActionsEnum)
  @JSONSchema({
    title: 'Action',
    description: 'Product-specific action type for this item.',
    type: 'string',
    enum: Object.values(ProductActionsEnum),
  })
  action?: ProductActionsEnum;
}
