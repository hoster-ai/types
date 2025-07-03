import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CountryEnum } from '../enums/country.enum';

/**
 * Defines the data structure for a client.
 * This object is used to transfer client data between different parts of the application.
 */
export class ClientDataDto {
  /**
   * Email of the user
   */
  @IsDefined()
  @IsEmail()
  email!: string;

  /**
   * First name of the user
   */
  @IsDefined()
  @IsString()
  firstName!: string;

  /**
   * Last name of the user
   */
  @IsDefined()
  @IsString()
  lastName!: string;

  /**
   * Telephone number of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  telephone!: string;

  /**
   * Mobile number of the user
   */
  @IsOptional()
  @IsPhoneNumber()
  mobile?: string;

  /**
   * Address line 1 of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  address1!: string;

  /**
   * Address line 2 of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  address2?: string;

  /**
   * Address line 3 of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  address3?: string;

  /**
   * Postal code of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  postcode!: string;

  /**
   * City of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  city!: string;

  /**
   * Country code of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CountryEnum)
  country!: CountryEnum;

  /**
   * State of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  state?: string;

  /**
   * VAT number of the user
   * @optional
   */
  @IsOptional()
  @IsString()
  vat?: string;

  /**
   * Tax office of the user
   * @optional
   */
  @IsOptional()
  @IsString()
  taxOffice?: string;
}
