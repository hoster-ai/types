import {
  IsString,
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CountryEnum } from '../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Billing contact information sent from hoster.ai to invoice integrations.
 * Contains the details of the person or business for whom an invoice will be issued.
 */
export class InvoiceContactData {
  /** Unique identifier for the invoice contact */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice Contact ID',
    description: 'Unique identifier for the invoice contact.',
    type: 'string',
  })
  invoiceContactId!: string;

  /** Whether this is a business contact (true) or individual person (false) */
  @IsBoolean()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Is Business Contact',
    description: 'Whether this is a business contact or individual person.',
    type: 'boolean',
  })
  isBusinessContact!: boolean;

  /** Contact's first name */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'First Name',
    description: "Contact's first name.",
    type: 'string',
  })
  firstName!: string;

  /** Contact's last name */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Last Name',
    description: "Contact's last name.",
    type: 'string',
  })
  lastName!: string;

  /** Business name (required when isBusinessContact is true) */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Business Name',
    description: 'Business name (required when isBusinessContact is true).',
    type: 'string',
  })
  businessName?: string;

  /** Contact's email address */
  @IsEmail()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Email',
    description: "Contact's email address.",
    type: 'string',
    format: 'email',
  })
  email!: string;

  /** Primary telephone number in international format (e.g., +30.2101234567) */
  @IsPhoneNumber()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Telephone',
    description: 'Primary telephone number in international format.',
    type: 'string',
  })
  telephone!: string;

  /** Mobile phone number in international format (e.g., +30.6901234567) */
  @IsPhoneNumber()
  @IsOptional()
  @JSONSchema({
    title: 'Mobile',
    description: 'Mobile phone number in international format.',
    type: 'string',
  })
  mobile?: string;

  /** Primary address line (street, number) */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 1',
    description: 'Primary address line (street, number).',
    type: 'string',
    minLength: 1,
    maxLength: 250,
  })
  address1!: string;

  /** Secondary address line (building, floor, apartment) */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 2',
    description: 'Secondary address line (building, floor, apartment).',
    type: 'string',
    maxLength: 250,
  })
  address2?: string;

  /** Additional address information */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 3',
    description: 'Additional address information.',
    type: 'string',
    maxLength: 250,
  })
  address3?: string;

  /** Postal/ZIP code */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(16)
  @JSONSchema({
    title: 'Postcode',
    description: 'Postal/ZIP code.',
    type: 'string',
    minLength: 1,
    maxLength: 16,
  })
  postcode!: string;

  /** City name */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  @JSONSchema({
    title: 'City',
    description: 'City name.',
    type: 'string',
    minLength: 1,
    maxLength: 250,
  })
  city!: string;

  /** Country code */
  @IsEnum(CountryEnum)
  @IsNotEmpty()
  @JSONSchema({
    title: 'Country',
    description: 'Country code.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  country!: CountryEnum;

  /** State/province/region (for countries that use this) */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  @JSONSchema({
    title: 'State',
    description: 'State/province/region.',
    type: 'string',
    maxLength: 250,
  })
  state?: string;

  /** Tax Identification Number (TIN/VAT number) */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'TIN',
    description: 'Tax Identification Number (TIN/VAT number).',
    type: 'string',
  })
  tin?: string;

  /** Tax office name or code */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Tax Office',
    description: 'Tax office name or code.',
    type: 'string',
  })
  taxOffice?: string;

  /** Contact's profession or business activity */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Profession',
    description: "Contact's profession or business activity.",
    type: 'string',
  })
  profession?: string;
}
