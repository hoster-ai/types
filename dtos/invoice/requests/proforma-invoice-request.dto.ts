import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { InvoiceContactData } from "../../invoice-contact-data.dto";
import { InvoiceItemDataDto } from "../invoice-item-data.dto";
import { TransactionData } from "../transaction-data.dto";

/**
 * Request payload for creating a proforma invoice.
 * Sent from hoster.ai to invoice integrations to issue a proforma document.
 */
export class ProformaInvoiceRequestDto {
  /** Unique identifier for the invoice */
  @IsString()
  @IsNotEmpty()
  invoiceId!: string;

  /** Company identifier issuing the invoice */
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  /** List of transactions associated with this invoice */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionData)
  transactions!: TransactionData[];

  /** Billing contact information for the invoice recipient */
  @ValidateNested()
  @Type(() => InvoiceContactData)
  invoiceContact!: InvoiceContactData;

  /** Line items included in the invoice */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDataDto)
  items!: InvoiceItemDataDto[];

  /** Total invoice amount */
  @IsNumber()
  @IsNotEmpty()
  totalAmount!: number;
}
