import { IsDefined, IsObject } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

/**
 * Represents a request to create a new product item.
 * This DTO contains all the necessary information for the creation process.
 */
export class ProductCreateRequestDto {
  /**
   * The client's data.
   * This object holds all the relevant information about the client initiating the request.
   */
  @IsDefined()
  @IsObject()
  clientData!: ClientDataDto;

  /**
   * The data for the new product item to be created.
   * This object contains the specific details of the product instance being provisioned.
   */
  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;
}
