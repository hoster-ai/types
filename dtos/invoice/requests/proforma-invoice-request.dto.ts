import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { InvoiceContactData } from '../../invoice-contact-data.dto';
import { InvoiceItemDataDto } from '../invoice-item-data.dto';
import { TransactionData } from '../transaction-data.dto';
import { CountryEnum } from '../../../enums/country.enum';

/**
 * Request payload for creating a proforma invoice.
 * Sent from hoster.ai to invoice integrations to issue a proforma document.
 */
export class ProformaInvoiceRequestDto {
  /** Unique identifier for the invoice */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Invoice ID',
    description: 'Unique identifier for the invoice.',
    type: 'string',
  })
  invoiceId!: string;

  /** Company identifier issuing the invoice */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Company ID',
    description: 'Company identifier issuing the invoice.',
    type: 'string',
  })
  companyId!: string;

  /** Country where the company is registered */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Company Country',
    description: 'Country where the company is registered.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  companyCountry!: CountryEnum;

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

  /** Billing contact information for the invoice recipient */
  @IsDefined()
  @ValidateNested()
  @Type(() => InvoiceContactData)
  @JSONSchema({
    title: 'Invoice Contact',
    description: 'Billing contact information for the invoice recipient.',
    $ref: '#/components/schemas/InvoiceContactData',
  })
  invoiceContact!: InvoiceContactData;

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
