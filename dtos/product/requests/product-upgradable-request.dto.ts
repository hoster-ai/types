import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to check if a product item is upgradable.
 * This DTO contains all the necessary information for the check.
 */
export class ProductUpgradableRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ClientDataDto)
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be checked.
   * This object contains the specific details of the product instance being evaluated.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  itemData!: ProductItemDataDto;
}
