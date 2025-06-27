import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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
  @ValidateNested()
  @Type(() => ClientDataDto)
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be suspended.
   * This object contains the specific details of the product instance being deactivated.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  itemData!: ProductItemDataDto;
}