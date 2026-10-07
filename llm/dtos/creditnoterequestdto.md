# CreditNoteRequestDto

**Description:** Request payload for creating a credit note. Names the credited invoice by hoster.ai id (parentInvoiceId) and by the integration id and number (parentExternalInvoiceId, parentInvoiceNumber) — all required.

**Source:** `dtos/invoice/requests/credit-note-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { BaseInvoiceRequestDto } from './base-invoice-request.dto';

/**
 * Request payload for creating a credit note: the common document payload plus
 * the invoice it credits.
 *
 * A credit note always credits an issued invoice, so it names that invoice both
 * by hoster.ai's id and by the integration's own id and number. Its amounts are
 * zero or positive like an invoice's: the document type makes it a reversal.
 */
export class CreditNoteRequestDto extends BaseInvoiceRequestDto {
  /** hoster.ai's identifier of the invoice being credited */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  parentInvoiceId!: string;

  /**
   * The integration's identifier of the invoice being credited — the `invoiceId`
   * it returned when it issued that invoice.
   */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  parentExternalInvoiceId!: string;

  /**
   * The number of the invoice being credited — the `invoiceNumber` the
   * integration returned when it issued that invoice.
   */
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  parentInvoiceNumber!: string;
}
```
