import { IsDefined, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CountryEnum } from '../../enums/country.enum';

/**
 * Contains detailed Tax Identification Number validation information.
 * Includes company details and address information from tax authority validation.
 */
export class TINValidationDetails {
  /**
   * Name of the company as registered with tax authorities
   */
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  companyName?: string;

  /**
   * Primary address line
   */
  @IsDefined()
  @IsString()
  @MinLength(1)
  address1!: string;

  /**
   * Secondary address line
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  address2?: string;

  /**
   * Tertiary address line
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  address3?: string;

  /**
   * Postal code
   */
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  postcode!: string;

  /**
   * City name
   */
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  city!: string;

  /**
   * Country code
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  country!: CountryEnum;

  /**
   * State or province (if applicable)
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  state?: string;

  /**
   * Tax Identification Number
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(20)
  tin?: string;

  /**
   * Tax office name or identifier
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  taxOffice?: string;

  /**
   * List of registered professions or business activities
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  profession?: string[];
}