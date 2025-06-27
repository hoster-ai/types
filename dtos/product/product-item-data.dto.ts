import { IsDefined, IsEnum } from 'class-validator';
import { DurationEnum } from '../../enums/duration.enum';

export class ProductItemDataDto {
  itemId!: string;

  @IsDefined()
  productAttributes!: Record<string, unknown>;

  @IsDefined()
  itemAttributes!: Record<string, unknown>;

  // να μην υπάρχει στο create
  @IsDefined()
  creationResponseData?: Record<string, unknown>;

  @IsDefined()
  @IsEnum(DurationEnum)
  duration!: DurationEnum;
}
