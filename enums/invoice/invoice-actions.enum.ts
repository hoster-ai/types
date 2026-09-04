/**
 * The actions an INVOICE integration is called for. Each value is the route the core calls
 * on the integration (`${integration.url}/${action}`), one per issued document type.
 */
export enum InvoiceActionsEnum {
  INVOICE_ISSUE_PROFORMA = 'invoice/proforma',
  INVOICE_ISSUE_INVOICE = 'invoice/invoice',
  INVOICE_ISSUE_CREDIT_NOTE = 'invoice/credit-note',
}
