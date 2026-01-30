import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  /** Unique identifier for the product */
  @IsNotEmpty()
  @IsString()
  productId!: string;

  /** Name of the product */
  @IsNotEmpty()
  @IsString()
  productName!: string;

  /** Resource name associated with the product */
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

  /** Start date of the product item */
  @IsNotEmpty()
  @IsString()
  startDate!: string;

  /** End date of the product item */
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