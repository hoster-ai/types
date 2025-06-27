import { IsDefined, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
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
  @ValidateNested()
  @Type(() => ClientDataDto)
  clientData!: ClientDataDto;

  /**
   * The data of the product item to be unsuspended.
   * This object contains the specific details of the product instance being reactivated.
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductItemDataDto)
  itemData!: ProductItemDataDto;
}