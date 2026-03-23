import {
  IsArray,
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CountryEnum } from '../../../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';
import { CompanyDataDto } from '../../company-data.dto';
import { InvoiceItemDataDto } from '../invoice-item-data.dto';
import { TransactionData } from '../transaction-data.dto';

/**
 * Request payload for calculating tax details.
 * Contains company and customer location information for tax rate determination.
 */
export abstract class BaseInvoiceRequestDto {
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
   * Customer's Tax Identification Number
   */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Customer TIN',
    description: "Customer's Tax Identification Number.",
    type: 'string',
  })
  TIN!: string;

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
  country!: CountryEnum;

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
  state?: string;

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
  postalCode?: string;

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

  /** Line items included in the invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDataDto)
  @JSONSchema({
    title: 'Items',
    description: 'Line items included in the invoice.',
    type: 'array',
    items: { $ref: '#/components/schemas/InvoiceItemDataDto' },
  })
  items!: InvoiceItemDataDto[];

  /** List of transactions associated with this invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionData)
  @JSONSchema({
    title: 'Transactions',
    description: 'List of transactions associated with this invoice.',
    type: 'array',
    items: { $ref: '#/components/schemas/TransactionData' },
  })
  transactions!: TransactionData[];

  /** Total invoice amount */
  @IsDefined()
  @IsNumber()
  @JSONSchema({
    title: 'Total Amount',
    description: 'Total invoice amount.',
    type: 'number',
  })
  totalAmount!: number;
}
