import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CountryEnum } from '../../../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';
import { CompanyDataDto } from '../../company-data.dto';

/**
 * Request payload for calculating tax details.
 * Contains company and customer location information for tax rate determination.
 */
export abstract class BaseInvoiceRequestDto {
  /**
   * Country where the company is registered
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Company Country',
    description: 'Country where the company is registered.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  companyCountry!: CountryEnum;

  /**
   * Company data
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDataDto)
  @JSONSchema({
    title: 'Company',
    description: 'Company data.',
    $ref: '#/components/schemas/CompanyDataDto',
  })
  company!: CompanyDataDto;

  /**
   * Country where the customer is located
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Customer Country',
    description: 'Country where the customer is located.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  customerCountry!: CountryEnum;

  /**
   * Customer's Tax Identification Number
   */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Customer TIN',
    description: "Customer's Tax Identification Number.",
    type: 'string',
  })
  customerTIN!: string;

  /**
   * Customer's postal code
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Customer Postal Code',
    description: "Customer's postal code.",
    type: 'string',
  })
  customerPostalCode?: string;

  /**
   * Customer's state or province
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Customer State',
    description: "Customer's state or province.",
    type: 'string',
  })
  customerState?: string;

  /**
   * Indicates whether the customer address has been validated
   */
  @IsOptional()
  @IsBoolean()
  @JSONSchema({
    title: 'Validated Address',
    description: 'Whether the customer address has been validated.',
    type: 'boolean',
  })
  validatedAddress?: boolean;
}
