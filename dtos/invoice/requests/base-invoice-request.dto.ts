import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { CompanyDataDto } from '../../company-data.dto';
import { InvoiceItemDataDto } from '../invoice-item-data.dto';
import { TransactionData } from '../transaction-data.dto';
import { InvoiceContactData } from '../../invoice-contact-data.dto';
import { CurrencyEnum } from '../../../enums/currency.enum';

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
   * Invoice contact data (without invoiceContactId)
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => InvoiceContactData)
  @JSONSchema({
    title: 'Invoice Contact',
    description: 'Invoice contact data (without invoiceContactId).',
    $ref: '#/components/schemas/InvoiceContactData',
  })
  invoiceContact!: Omit<InvoiceContactData, 'invoiceContactId'>;

  @IsDefined()
  @IsEnum(CurrencyEnum)
  @JSONSchema({
    title: 'Currency',
    description: 'Currency of the invoice.',
    type: 'string',
    enum: Object.values(CurrencyEnum),
  })
  currency!: CurrencyEnum;

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

  /**
   * Discount amount
   */
  @IsDefined()
  @IsNumber()
  @JSONSchema({
    title: 'Discount Amount',
    description: 'Discount amount.',
    type: 'number',
  })
  discountAmount!: number;
}
