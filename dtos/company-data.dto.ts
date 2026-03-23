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
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Data Transfer Object for company data.
 */
export class CompanyDataDto {
  /**
   * The unique identifier for the company.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'ID',
    description: 'The unique identifier for the company.',
    type: 'string',
  })
  id!: string;

  /**
   * The name of the company.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Name',
    description: 'The name of the company.',
    type: 'string',
  })
  name!: string;

  /**
   * An array of email addresses associated with the company.
   */
  @IsEmail({}, { each: true })
  @IsArray()
  @JSONSchema({
    title: 'Emails',
    description: 'Email addresses associated with the company.',
    type: 'array',
    items: { type: 'string', format: 'email' },
  })
  emails!: string[];

  /**
   * The email address used for invoicing.
   */
  @IsEmail()
  @JSONSchema({
    title: 'Invoice Email',
    description: 'The email address used for invoicing.',
    type: 'string',
    format: 'email',
  })
  invoiceEmail!: string;

  /**
   * The URL for the company's privacy policy.
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @JSONSchema({
    title: 'Privacy Policy URL',
    description: "The URL for the company's privacy policy.",
    type: 'string',
    format: 'uri',
  })
  privacyPolicyUrl!: string;

  /**
   * The default language for the company.
   */
  @IsEnum(LanguageEnum)
  @JSONSchema({
    title: 'Default Language',
    description: 'The default language for the company.',
    type: 'string',
    enum: Object.values(LanguageEnum),
  })
  defaultLanguage!: LanguageEnum;

  /**
   * An array of supported languages for the company.
   */
  @IsEnum(LanguageEnum, { each: true })
  @IsArray()
  @JSONSchema({
    title: 'Languages',
    description: 'Supported languages for the company.',
    type: 'array',
    items: { type: 'string', enum: Object.values(LanguageEnum) },
  })
  languages!: LanguageEnum[];

  /**
   * The primary telephone number for the company.
   */
  @IsPhoneNumber()
  @JSONSchema({
    title: 'Telephone',
    description: 'The primary telephone number for the company.',
    type: 'string',
  })
  telephone!: string;

  /**
   * The mobile phone number for the company (optional).
   */
  @IsPhoneNumber()
  @IsOptional()
  @JSONSchema({
    title: 'Mobile',
    description: 'The mobile phone number for the company.',
    type: 'string',
  })
  mobile?: string;

  /**
   * The first line of the company's address.
   */
  @IsString()
  @JSONSchema({
    title: 'Address Line 1',
    description: "The first line of the company's address.",
    type: 'string',
  })
  address1!: string;

  /**
   * The second line of the company's address (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Address Line 2',
    description: "The second line of the company's address.",
    type: 'string',
  })
  address2?: string;

  /**
   * The third line of the company's address (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Address Line 3',
    description: "The third line of the company's address.",
    type: 'string',
  })
  address3?: string;

  /**
   * The postal code for the company's address.
   */
  @IsString()
  @JSONSchema({
    title: 'Postcode',
    description: "The postal code for the company's address.",
    type: 'string',
  })
  postcode!: string;

  /**
   * The city for the company's address.
   */
  @IsString()
  @JSONSchema({
    title: 'City',
    description: "The city for the company's address.",
    type: 'string',
  })
  city!: string;

  /**
   * The country for the company's address.
   */
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Country',
    description: "The country for the company's address.",
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  country!: CountryEnum;

  /**
   * The state or province for the company's address (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'State',
    description: "The state or province for the company's address.",
    type: 'string',
  })
  state?: string;

  /**
   * The VAT number for the company (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'VAT',
    description: 'The VAT number for the company.',
    type: 'string',
  })
  vat?: string;

  /**
   * The tax office for the company (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Tax Office',
    description: 'The tax office for the company.',
    type: 'string',
  })
  taxOffice?: string;

  /**
   * The logo URL for the company (optional).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Logo URL',
    description: 'The logo URL for the company.',
    type: 'string',
    format: 'uri',
  })
  logoUrl?: string;
}
