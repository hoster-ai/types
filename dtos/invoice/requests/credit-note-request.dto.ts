import { IsOptional, IsString } from "class-validator";
import { ProformaInvoiceRequestDto } from "./proforma-invoice-request.dto";

/**
 * Request payload for creating a credit note.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class CreditNoteRequestDto extends ProformaInvoiceRequestDto {
  /** Reference to the parent invoice being credited */
  @IsOptional()
  @IsString()
  parentInvoiceId!: string;
}