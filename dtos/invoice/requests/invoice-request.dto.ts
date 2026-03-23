import { IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { ProformaInvoiceRequestDto } from './proforma-invoice-request.dto';

/**
 * Request payload for creating a standard invoice.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class InvoiceRequestDto extends ProformaInvoiceRequestDto {
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
