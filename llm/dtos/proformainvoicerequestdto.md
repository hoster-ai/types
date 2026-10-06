# ProformaInvoiceRequestDto

**Description:** Request payload for creating a proforma invoice. Sent from hoster.ai to invoice integrations to issue a proforma document.

**Source:** `dtos/invoice/requests/proforma-invoice-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a proforma invoice.
 * Sent from hoster.ai to invoice integrations to issue a proforma document.
 */
export class ProformaInvoiceRequestDto extends BaseInvoiceRequestDto {}
```
