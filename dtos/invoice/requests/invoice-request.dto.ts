import { IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a standard invoice.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class InvoiceRequestDto extends BaseInvoiceRequestDto {
  /** Reference to parent invoice if applicable */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Parent Invoice ID',
    description: 'Reference to parent invoice if applicable.',
    type: 'string',
  })
  parentInvoiceId?: string;
}
