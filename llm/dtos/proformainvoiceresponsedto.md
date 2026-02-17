# ProformaInvoiceResponseDto

**Description:** Response from invoice integrations after successfully creating a proforma invoice. Contains the generated invoice details and access URL.

**Source:** `dtos/invoice/responses/proforma-invoice-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Response from invoice integrations after successfully creating a proforma invoice.
 * Contains the generated invoice details and access URL.
 */
export class ProformaInvoiceResponseDto {
  /** URL to access the generated invoice document */
  @IsUrl()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice URL',
    description: 'URL to access the generated invoice document.',
    type: 'string',
    format: 'uri',
  })
  invoiceUrl!:string;

  /** Invoice number assigned by the integration */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice Number',
    description: 'Invoice number assigned by the integration.',
    type: 'string',
  })
  invoiceNumber!:string;

  /** Unique identifier for the invoice in the integration system */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Invoice ID',
    description: 'Unique identifier for the invoice in the integration system.',
    type: 'string',
  })
  invoiceId!:string;
}
```

