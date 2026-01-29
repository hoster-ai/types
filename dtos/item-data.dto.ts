import { IsDefined, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { InvoiceItemActionsEnum } from '../enums/invoice/invoice-item-actions.enum';

/**
 * Represents the data of a specific product item.
 * This DTO is used to transfer detailed information about a product instance.
 */
export class ItemDataDto {
  /**
   * The unique identifier for the product item.
   */
  @IsOptional()
  @IsString()
  itemId?: string;

  @IsNotEmpty()
  @IsString()
  productId!: string;

  @IsNotEmpty()
  @IsString()
  productName!: string;

  @IsNotEmpty()
  @IsString()
  resourceName!: string;

  /**
   * A record of product-level attributes.
   * These are general attributes defined for the product type.
   */
  @IsDefined()
  productAttributes!: Record<string, unknown>;

  /**
   * A record of item-specific attributes.
   * These are attributes that are unique to this particular instance of the product.
   */
  @IsDefined()
  itemAttributes!: Record<string, unknown>;

  /**
   * Data returned from the creation response.
   * This field should not be present in the create request.
   * @optional
   */
  @IsOptional()
  creationResponseData?: Record<string, unknown>;

  @IsNotEmpty()
  @IsString()
  startDate!: string;

  @IsNotEmpty()
  @IsString()
  endDate!: string;

  /**
   * The price of the product item without tax and discount.
   */
  @IsDefined()
  price!: number;

  /**
   * The discount of the product item. The price after removing the discount
   */
  @IsDefined()
  discountPrice!: number;
}