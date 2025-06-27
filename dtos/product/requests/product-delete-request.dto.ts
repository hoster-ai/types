import { IsDefined, IsObject } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to delete a product item.
 * This DTO contains all the necessary information for the deletion process.
 */
export class ProductDeleteRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be deleted.
   * This object contains the specific details of the product instance being removed.
   */
  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;
}
