import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { BaseResponse } from '../../base-response.dto';
import { TINValidationDetails } from '../tin-validation-details.dto';

/**
 * Represents the response containing tax calculation details.
 * Includes VAT rate and optional TIN validation information.
 */
export class TaxDetailsResponseDto extends BaseResponse {
  /**
   * The applicable VAT rate for the transaction
   */
  @IsDefined()
  @IsNumber()
  vatRate!: number;

  /**
   * Indicates whether the Tax Identification Number is valid
   */
  @IsOptional()
  @IsBoolean()
  TINValid?: boolean;

  /**
   * Detailed tax validation information including company details
   */
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TINValidationDetails)
  taxDetails?: TINValidationDetails;
}