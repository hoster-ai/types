import {
  IsArray,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { CompanyDataDto } from '../../company-data.dto';
import { InvoiceItemDataDto } from '../invoice-item-data.dto';
import { TransactionData } from '../transaction-data.dto';
import { InvoiceContactData } from '../../invoice-contact-data.dto';
import { CurrencyEnum } from '../../../enums/currency.enum';
import {
  IsMoneyAmount,
  MatchesAmount,
  sumOf,
} from '../../../decorators/is-money-amount.validator';

/**
 * Common payload of every document request sent to invoice integrations.
 *
 * Amounts are decimal major units (e.g. 12.40), up to two decimal places — not
 * cents — and zero or positive, on a credit note too: the document type makes it
 * a reversal. Per line `netAmount + vatAmount` is the line gross; the lines' sums
 * equal `netTotal` and `vatTotal`, and `totalAmount = netTotal + vatTotal`, each
 * within 0.01.
 */
export abstract class BaseInvoiceRequestDto {
  /**
   * The core's identifier for the document being issued.
   *
   * Optional, and echoed back by the integration only as context — the core uses it
   * as the write target when the outcome arrives, exactly as `ItemDataDto.itemId`
   * works for product actions. Without it the core has to smuggle its own id
   * alongside the contract payload (issue #27). NOT the same as `parentInvoiceId`,
   * which refers to the invoice being credited.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Invoice ID',
    description: "The core's identifier for the document being issued.",
    type: 'string',
  })
  invoiceId?: string;

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
  invoiceContact!: InvoiceContactData;

  @IsDefined()
  @IsEnum(CurrencyEnum)
  @JSONSchema({
    title: 'Currency',
    description: 'Currency of the invoice.',
    $ref: '#/components/schemas/CurrencyEnum',
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

  /**
   * Sum of the lines' `netAmount`, within 0.01. Decimal major units, up to two
   * decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => sumOf(request.items, 'netAmount'),
    "the sum of the items' netAmount",
  )
  @JSONSchema({
    title: 'Net Total',
    description:
      "Document total before VAT: the sum of the items' netAmount, within 0.01. Decimal major units (not cents), up to two decimal places, zero or positive also on a credit note.",
    type: 'number',
    minimum: 0,
  })
  netTotal!: number;

  /**
   * Sum of the lines' `vatAmount`, within 0.01. Decimal major units, up to two
   * decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => sumOf(request.items, 'vatAmount'),
    "the sum of the items' vatAmount",
  )
  @JSONSchema({
    title: 'VAT Total',
    description:
      "Document VAT: the sum of the items' vatAmount, within 0.01. Decimal major units (not cents), up to two decimal places, zero or positive also on a credit note.",
    type: 'number',
    minimum: 0,
  })
  vatTotal!: number;

  /**
   * Gross invoice amount: `netTotal + vatTotal`, within 0.01. Decimal major
   * units, up to two decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => request.netTotal + request.vatTotal,
    'netTotal + vatTotal',
  )
  @JSONSchema({
    title: 'Total Amount',
    description:
      'Gross invoice amount: netTotal + vatTotal, within 0.01. Decimal major units (not cents), up to two decimal places, zero or positive also on a credit note.',
    type: 'number',
    minimum: 0,
  })
  totalAmount!: number;

  /**
   * Discount amount, already reflected in the lines' `netAmount`.
   */
  @IsMoneyAmount()
  @JSONSchema({
    title: 'Discount Amount',
    description:
      "Discount amount, already reflected in the items' netAmount. Decimal major units (not cents), up to two decimal places.",
    type: 'number',
    minimum: 0,
  })
  discountAmount!: number;
}
