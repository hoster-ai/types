import { IsDefined, IsObject } from 'class-validator';
import { ProductItemDataDto } from '../product-item-data.dto';
import { ClientDataDto } from '../../client-data.dto';

export class ProductCreateRequestDto {
  @IsDefined()
  @IsObject()
  clientData!: ClientDataDto;

  @IsDefined()
  @IsObject()
  itemData!: ProductItemDataDto;
}
