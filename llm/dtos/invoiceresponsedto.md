# InvoiceResponseDto

**Description:** Response from invoice integrations after successfully creating a standard invoice. Maintains consistency with request/response naming (InvoiceRequest → InvoiceResponse).

**Source:** `dtos/invoice/responses/invoice-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ProformaInvoiceResponseDto } from './proforma-invoice-response.dto';

/**
 * Response from invoice integrations after successfully creating a standard invoice.
 * Maintains consistency with request/response naming (InvoiceRequest → InvoiceResponse).
 */
export class InvoiceResponseDto extends ProformaInvoiceResponseDto {}
```
