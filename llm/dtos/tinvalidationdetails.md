# TINValidationDetails

**Description:** Contains detailed Tax Identification Number validation information. Includes company details and address information from tax authority validation.

**Source:** `dtos/invoice/tin-validation-details.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CountryEnum } from '../../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Company Name',
    description: 'Name of the company as registered with tax authorities.',
    type: 'string',
    minLength: 1,
    maxLength: 250,
  })
  companyName?: string;

  /**
   * Primary address line
   */
  @IsDefined()
  @IsString()
  @MinLength(1)
  @JSONSchema({
    title: 'Address Line 1',
    description: 'Primary address line.',
    type: 'string',
    minLength: 1,
  })
  address1!: string;

  /**
   * Secondary address line
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 2',
    description: 'Secondary address line.',
    type: 'string',
    maxLength: 250,
  })
  address2?: string;

  /**
   * Tertiary address line
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Address Line 3',
    description: 'Tertiary address line.',
    type: 'string',
    maxLength: 250,
  })
  address3?: string;

  /**
   * Postal code
   */
  @IsDefined()
  @IsString()
  @MinLength(1)
  @MaxLength(16)
  @JSONSchema({
    title: 'Postcode',
    description: 'Postal code.',
    type: 'string',
    minLength: 1,
    maxLength: 16,
  })
  postcode!: string;

  /**
   * City name
   */
  @IsDefined()
  @IsString()
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

  /**
   * Country code
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Country',
    description: 'Country code.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  country!: CountryEnum;

  /**
   * State or province (if applicable)
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'State',
    description: 'State or province.',
    type: 'string',
    maxLength: 250,
  })
  state?: string;

  /**
   * Tax Identification Number
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(20)
  @JSONSchema({
    title: 'TIN',
    description: 'Tax Identification Number.',
    type: 'string',
    maxLength: 20,
  })
  tin?: string;

  /**
   * Tax office name or identifier
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Tax Office',
    description: 'Tax office name or identifier.',
    type: 'string',
    maxLength: 250,
  })
  taxOffice?: string;

  /**
   * List of registered professions or business activities
   */
  @IsOptional()
  @IsString()
  @MinLength(0)
  @MaxLength(250)
  @JSONSchema({
    title: 'Profession',
    description: 'List of registered professions or business activities.',
    type: 'array',
    items: { type: 'string' },
  })
  profession?: string[];
}
```

