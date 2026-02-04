import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to upgrade a product item.
 * This DTO contains all the necessary information for the upgrade process.
 */
export class ProductUpgradeRequestDto {
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
   * The data of the product item to be upgraded.
   * This object contains the specific details of the product instance being modified.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  itemData!: ProductItemDataDto;

  /**
   * The data of the product item before the upgrade.
   * This object contains the state of the product instance prior to the upgrade.
   * @optional
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  previousItemData?: ProductItemDataDto;
}
