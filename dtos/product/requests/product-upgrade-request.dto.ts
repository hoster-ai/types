import { IsDefined, IsObject } from 'class-validator';
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
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be upgraded.
   * This object contains the specific details of the product instance being modified.
   */
  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;

  /**
   * The data of the product item before the upgrade.
   * This object contains the state of the product instance prior to the upgrade.
   * @optional
   */
  @IsDefined()
  @IsObject()
  previousItemData?: ProductItemDataDto;
}
