# ProformaInvoiceResponseDto

**Description:** Response from invoice integrations after successfully creating a proforma invoice. Contains the generated invoice details and access URL.

**Source:** `dtos/invoice/responses/proforma-invoice-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsNotEmpty, IsString, IsUrl } from "class-validator";

/**
 * Response from invoice integrations after successfully creating a proforma invoice.
 * Contains the generated invoice details and access URL.
 */
export class ProformaInvoiceResponseDto {
  /** URL to access the generated invoice document */
  @IsUrl()
  @IsNotEmpty()
  invoiceUrl!:string;

  /** Invoice number assigned by the integration */
  @IsString()
  @IsNotEmpty()
  invoiceNumber!:string;

  /** Unique identifier for the invoice in the integration system */
  @IsString()
  @IsNotEmpty()
  invoiceId!:string;
}
```

