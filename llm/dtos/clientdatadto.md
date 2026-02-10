# ClientDataDto

**Description:** Defines the data structure for a client. This object is used to transfer client data between different parts of the application.

**Source:** `dtos/client-data.dto.ts`

**Language:** typescript

## Code

```typescript
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
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Email',
    description: 'Email of the user.',
    type: 'string',
    format: 'email',
  })
  email!: string;

  /**
   * First name of the user
   */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'First Name',
    description: 'First name of the user.',
    type: 'string',
  })
  firstName!: string;

  /**
   * Last name of the user
   */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Last Name',
    description: 'Last name of the user.',
    type: 'string',
  })
  lastName!: string;

  /**
   * Telephone number of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @JSONSchema({
    title: 'Telephone',
    description: 'Telephone number of the user.',
    type: 'string',
  })
  telephone!: string;

  /**
   * Mobile number of the user
   */
  @IsOptional()
  @IsPhoneNumber()
  @JSONSchema({
    title: 'Mobile',
    description: 'Mobile number of the user.',
    type: 'string',
  })
  mobile?: string;

  /**
   * Address line 1 of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 1',
    description: 'Address line 1 of the user.',
    type: 'string',
    minLength: 1,
    maxLength: 250,
  })
  address1!: string;

  /**
   * Address line 2 of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 2',
    description: 'Address line 2 of the user.',
    type: 'string',
    maxLength: 250,
  })
  address2?: string;

  /**
   * Address line 3 of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 3',
    description: 'Address line 3 of the user.',
    type: 'string',
    maxLength: 250,
  })
  address3?: string;

  /**
   * Postal code of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @JSONSchema({
    title: 'Postcode',
    description: 'Postal code of the user.',
    type: 'string',
    minLength: 1,
    maxLength: 16,
  })
  postcode!: string;

  /**
   * City of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(250)
  @JSONSchema({
    title: 'City',
    description: 'City of the user.',
    type: 'string',
    minLength: 1,
    maxLength: 250,
  })
  city!: string;

  /**
   * Country code of the user
   */
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Country',
    description: 'Country code of the user.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  country!: CountryEnum;

  /**
   * State of the user
   */
  @IsOptional()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'State',
    description: 'State of the user.',
    type: 'string',
    maxLength: 250,
  })
  state?: string;

  /**
   * VAT number of the user
   * @optional
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'VAT',
    description: 'VAT number of the user.',
    type: 'string',
  })
  vat?: string;

  /**
   * Tax office of the user
   * @optional
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Tax Office',
    description: 'Tax office of the user.',
    type: 'string',
  })
  taxOffice?: string;
}
```

