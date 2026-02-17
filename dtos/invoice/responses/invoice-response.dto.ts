import { ProformaInvoiceResponseDto } from "./proforma-invoice-response.dto";

/**
 * Response from invoice integrations after successfully creating a standard invoice.
 * Maintains consistency with request/response naming (InvoiceRequest → InvoiceResponse).
 */
export class InvoiceResponseDto extends ProformaInvoiceResponseDto {
    
}