# InvoiceContactData

**Description:** Billing contact information sent from hoster.ai to invoice integrations. Contains the details of the person or business for whom an invoice will be issued.

**Source:** `dtos/invoice-contact-data.dto.ts`

**Language:** typescript

## Code

```typescript
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

/**
 * Billing contact information sent from hoster.ai to invoice integrations.
 * Contains the details of the person or business for whom an invoice will be issued.
 */
export class InvoiceContactData {
  /** Unique identifier for the invoice contact */
  @IsString()
  @IsNotEmpty()
  invoiceContactId!: string;

  /** Whether this is a business contact (true) or individual person (false) */
  @IsBoolean()
  @IsNotEmpty()
  isBusinessContact!: boolean;

  /** Contact's first name */
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  /** Contact's last name */
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  /** Business name (required when isBusinessContact is true) */
  @IsString()
  @IsOptional()
  businessName?: string;

  /** Contact's email address */
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  /** Primary telephone number in international format (e.g., +30.2101234567) */
  @IsPhoneNumber()
  @IsNotEmpty()
  telephone!: string;

  /** Mobile phone number in international format (e.g., +30.6901234567) */
  @IsPhoneNumber()
  @IsOptional()
  mobile?: string;

  /** Primary address line (street, number) */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  address1!: string;

  /** Secondary address line (building, floor, apartment) */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  address2?: string;

  /** Additional address information */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  address3?: string;

  /** Postal/ZIP code */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(16)
  postcode!: string;

  /** City name */
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(250)
  city!: string;

  /** Country code */
  @IsEnum(CountryEnum)
  @IsNotEmpty()
  country!: CountryEnum;

  /** State/province/region (for countries that use this) */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  state?: string;

  /** Tax Identification Number (TIN/VAT number) */
  @IsString()
  @IsOptional()
  TIN?: string;

  /** Tax office name or code */
  @IsString()
  @IsOptional()
  taxOffice?: string;

  /** Contact's profession or business activity */
  @IsString()
  @IsOptional()
  profession?: string;
}
```
