import {
  IsString,
  IsEmail,
  IsUrl,
  IsEnum,
  IsArray,
  IsOptional,
  IsNotEmpty,
  IsPhoneNumber,
} from 'class-validator';
import { CountryEnum } from '../enums/country.enum';
import { LanguageEnum } from '../enums/language.enum';

/**
 * Data Transfer Object for company data.
 */
export class CompanyDataDto {
  /**
   * The unique identifier for the company.
   */
  @IsString()
  @IsNotEmpty()
  id!: string;

  /**
   * The name of the company.
   */
  @IsString()
  @IsNotEmpty()
  name!: string;

  /**
   * An array of email addresses associated with the company.
   */
  @IsEmail({}, { each: true })
  @IsArray()
  emails!: string[];

  /**
   * The email address used for invoicing.
   */
  @IsEmail()
  invoiceEmail!: string;

  /**
   * The URL for the company's privacy policy.
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  privacyPolicyUrl!: string;

  /**
   * The default language for the company.
   */
  @IsEnum(LanguageEnum)
  defaultLanguage!: LanguageEnum;

  /**
   * An array of supported languages for the company.
   */
  @IsEnum(LanguageEnum, { each: true })
  @IsArray()
  languages!: LanguageEnum[];

  /**
   * The primary telephone number for the company.
   */
  @IsPhoneNumber()
  telephone!: string;

  /**
   * The mobile phone number for the company (optional).
   */
  @IsPhoneNumber()
  @IsOptional()
  mobile?: string;

  /**
   * The first line of the company's address.
   */
  @IsString()
  address1!: string;

  /**
   * The second line of the company's address (optional).
   */
  @IsString()
  @IsOptional()
  address2?: string;

  /**
   * The third line of the company's address (optional).
   */
  @IsString()
  @IsOptional()
  address3?: string;

  /**
   * The postal code for the company's address.
   */
  @IsString()
  postcode!: string;

  /**
   * The city for the company's address.
   */
  @IsString()
  city!: string;

  /**
   * The country for the company's address.
   */
  @IsEnum(CountryEnum)
  country!: CountryEnum;

  /**
   * The state or province for the company's address (optional).
   */
  @IsString()
  @IsOptional()
  state?: string;

  /**
   * The VAT number for the company (optional).
   */
  @IsString()
  @IsOptional()
  vat?: string;

  /**
   * The tax office for the company (optional).
   */
  @IsString()
  @IsOptional()
  taxOffice?: string;
}
