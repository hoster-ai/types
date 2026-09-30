import { IsNotEmpty, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a credit note.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 *
 * A credit note always credits an issued invoice, so it names that invoice both
 * by hoster.ai's id and by the integration's own id and number.
 */
export class CreditNoteRequestDto extends BaseInvoiceRequestDto {
  /** hoster.ai's identifier of the invoice being credited */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Parent Invoice ID',
    description: "hoster.ai's identifier of the invoice being credited.",
    type: 'string',
  })
  parentInvoiceId!: string;

  /**
   * The integration's identifier of the invoice being credited — the `invoiceId`
   * it returned when it issued that invoice.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Parent External Invoice ID',
    description:
      "The integration's identifier of the invoice being credited: the invoiceId it returned when it issued that invoice.",
    type: 'string',
  })
  parentExternalInvoiceId!: string;

  /**
   * The number of the invoice being credited — the `invoiceNumber` the
   * integration returned when it issued that invoice.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Parent Invoice Number',
    description:
      'The number of the invoice being credited: the invoiceNumber the integration returned when it issued that invoice.',
    type: 'string',
  })
  parentInvoiceNumber!: string;
}
