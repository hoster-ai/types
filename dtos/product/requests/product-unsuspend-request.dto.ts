import { IsDefined, IsObject } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to unsuspend a product item.
 * This DTO contains all the necessary information for the unsuspend process.
 */
export class ProductUnsuspendRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be unsuspended.
   * This object contains the specific details of the product instance being reactivated.
   */
  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;
}
