import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a proforma invoice.
 * Sent from hoster.ai to invoice integrations to issue a proforma document.
 */
export class ProformaInvoiceRequestDto extends BaseInvoiceRequestDto {}
