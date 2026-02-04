import { IsBoolean, IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';
import { CountryEnum } from '../../../enums/country.enum';

/**
 * Request payload for calculating tax details.
 * Contains company and customer location information for tax rate determination.
 */
export class TaxDetailsRequestDto {
  /**
   * Country where the company is registered
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  companyCountry!: CountryEnum;

  /**
   * Country where the customer is located
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  customerCountry!: CountryEnum;

  /**
   * Customer's Tax Identification Number
   */
  @IsDefined()
  @IsString()
  customerTIN!: string;

  /**
   * Customer's postal code
   */
  @IsOptional()
  @IsString()
  customerPostalCode?: string;

  /**
   * Customer's state or province
   */
  @IsOptional()
  @IsString()
  customerState?: string;

  /**
   * Indicates whether the customer address has been validated
   */
  @IsOptional()
  @IsBoolean()
  validatedAddress?: boolean;
}