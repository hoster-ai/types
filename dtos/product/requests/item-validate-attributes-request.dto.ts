import { IsDefined, IsObject, IsString, ValidateNested } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { Type } from 'class-transformer';

/**
 * Represents a request to validate item attributes.
 * This DTO is used when a client needs to check the validity of a set of attribute values
 * before proceeding with an action, such as creating or updating an item.
 */
export class ItemValidateAttributesRequestDto {
  /**
   * The product data of the item.
   */
  @IsDefined()
  @Type(() => ProductItemDataDto)
  @ValidateNested()
  productData!: ProductItemDataDto;

  /**
   * The key of the attribute that triggered the validation.
   * This helps the server understand the context of the validation request,
   * especially in cases where validation rules are interdependent.
   */
  @IsDefined()
  @IsString()
  triggeredByKey!: string;

  /**
   * A record of attribute values to be validated.
   * The keys are the attribute identifiers, and the values are the data to be checked.
   */
  @IsDefined()
  @IsObject()
  attributeValues!: Record<string, unknown>;
}
