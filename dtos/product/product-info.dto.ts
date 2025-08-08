import { IsArray, IsObject, IsOptional, ValidateNested, ArrayMinSize } from 'class-validator';
import { FieldDto } from '../field.dto';
import { InfoDto } from '../info.dto';
import { UnitDto } from '../unit.dto';
import { Type } from 'class-transformer';

/**
 * DTO for notification information.
 * Extends the base InfoDto to include the notification message type.
 */
export class ProductInfoDto extends InfoDto {
  /**
   * Custom attributes that can be defined for products.
   * These attributes will be displayed in the product configuration section.
   */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  productAttributes?: FieldDto[];

  /**
   * Custom attributes that can be defined for items.
   * These attributes will be displayed in the item details section.
   */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  itemAttributes?: FieldDto[];

  /**
   * Defines the units for pay-per-use billing.
   * This allows the administrator to set a price for each unit per interval.
   * @example [{ id: "ram", unitDescription: "MB", intervalDescription: "month" }]
   */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  payPerUseUnits?: UnitDto[];

  /**
   * Specifies the field names that will be returned in the response data after a successful creation.
   * This allows the system to know what to expect in the response before the creation is executed.
   */
  @IsOptional()
  @IsObject()
  responseDataFieldNames?: Record<string, unknown>;
}
