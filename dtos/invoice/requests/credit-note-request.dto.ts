import { IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a credit note.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class CreditNoteRequestDto extends BaseInvoiceRequestDto {
  /** Reference to the parent invoice being credited */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Parent Invoice ID',
    description: 'Reference to the parent invoice being credited.',
    type: 'string',
  })
  parentInvoiceId!: string;
}
