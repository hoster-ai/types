import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { DurationEnum } from '../../enums/duration.enum';

/**
 * Represents the data of a specific product item.
 * This DTO is used to transfer detailed information about a product instance.
 */
export class ProductItemDataDto {
  /**
   * The unique identifier for the product item.
   */
  @IsOptional()
  @IsString()
  itemId?: string;

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

  /**
   * The duration of the product subscription or license.
   */
  @IsDefined()
  @IsEnum(DurationEnum)
  duration!: DurationEnum;
}
