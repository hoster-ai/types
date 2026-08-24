# CreditNoteResponseDto

**Description:** Response from invoice integrations after successfully creating a credit note. Maintains consistency with request/response naming (CreditNoteRequest → CreditNoteResponse).

**Source:** `dtos/invoice/responses/credit-note-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { ProformaInvoiceResponseDto } from './proforma-invoice-response.dto';

/**
 * Response from invoice integrations after successfully creating a credit note.
 * Maintains consistency with request/response naming (CreditNoteRequest → CreditNoteResponse).
 */
export class CreditNoteResponseDto extends ProformaInvoiceResponseDto {}
```
