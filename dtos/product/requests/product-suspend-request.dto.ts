import { IsDefined, IsObject } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to suspend a product item.
 * This DTO contains all the necessary information for the suspension process.
 */
export class ProductSuspendRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be suspended.
   * This object contains the specific details of the product instance being deactivated.
   */
  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;
}
