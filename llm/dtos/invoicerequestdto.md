# InvoiceRequestDto

**Description:** Request payload for creating a standard invoice. Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.

**Source:** `dtos/invoice/requests/invoice-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsOptional, IsString } from "class-validator";
import { ProformaInvoiceRequestDto } from "./proforma-invoice-request.dto";

/**
 * Request payload for creating a standard invoice.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class InvoiceRequestDto extends ProformaInvoiceRequestDto {
  /** Reference to parent invoice if applicable */
  @IsOptional()
  @IsString()
  parentInvoiceId?: string;
}
```

