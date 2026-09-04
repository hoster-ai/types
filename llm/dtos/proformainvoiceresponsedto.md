# ProformaInvoiceResponseDto

**Description:** Response from invoice integrations after issuing a proforma invoice. Contains the generated invoice details and access URL.

**Source:** `dtos/invoice/responses/proforma-invoice-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsEnum, IsNotEmpty, IsString, IsUrl, ValidateIf } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { ResponseStatusEnum } from '../../../enums/response-status.enum';
import { BaseResponse } from '../../base-response.dto';

/**
 * Response from invoice integrations after issuing a proforma invoice.
 * Contains the generated invoice details and access URL.
 *
 * Sent BOTH as the synchronous reply and, when the core dispatches the call through
 * Cloud Tasks, as the body of the deferred hook — the integration reports by posting
 * this same object back. Mirrors the product responses so both families correlate
 * and settle the same way (issue #27).
 */
export class ProformaInvoiceResponseDto extends BaseResponse {
  /**
   * The status of the response, indicating the outcome of the issuance.
   * Without it an integration cannot report a business failure — only success or a
   * transport-level error.
   */
  @IsEnum(ResponseStatusEnum)
  @JSONSchema({
    title: 'Status',
    description:
      'The status of the response, indicating the outcome of the issuance.',
    type: 'string',
    enum: Object.values(ResponseStatusEnum),
  })
  status!: ResponseStatusEnum;

  /**
   * The outbox action identifier, echoed verbatim from the `X-Idempotency-Key`
   * header sent by the core. Used for correlation and anti-replay when the action
   * completes synchronously or later via a deferred hook. NOTE: this is the CORE's
   * id for the action — `invoiceId` below is the document's id in the integration's
   * own system and is never a correlation key.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Outbox ID',
    description:
      'The outbox action identifier, echoed verbatim from the X-Idempotency-Key header sent by the core, used for correlation and anti-replay.',
    type: 'string',
  })
  outboxId!: string;

  /**
   * URL to access the generated invoice document. The three document fields below exist
   * only on a SUCCESS: a `failure` or `pending` report has no document to describe.
   */
  @ValidateIf((response: ProformaInvoiceResponseDto) => response.status === ResponseStatusEnum.SUCCESS)
  @IsUrl()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice URL',
    description: 'URL to access the generated invoice document.',
    type: 'string',
    format: 'uri',
  })
  invoiceUrl?: string;

  /** Invoice number assigned by the integration */
  @ValidateIf((response: ProformaInvoiceResponseDto) => response.status === ResponseStatusEnum.SUCCESS)
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice Number',
    description: 'Invoice number assigned by the integration.',
    type: 'string',
  })
  invoiceNumber?: string;

  /** Unique identifier for the invoice in the integration system */
  @ValidateIf((response: ProformaInvoiceResponseDto) => response.status === ResponseStatusEnum.SUCCESS)
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice ID',
    description: 'Unique identifier for the invoice in the integration system.',
    type: 'string',
  })
  invoiceId?: string;
}
```
