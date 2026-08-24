# CreditNoteRequestDto

**Description:** Request payload for creating a credit note. Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.

**Source:** `dtos/invoice/requests/credit-note-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { ProformaInvoiceRequestDto } from './proforma-invoice-request.dto';

/**
 * Request payload for creating a credit note.
 * Extends proforma invoice with minimal variations to keep the API clean for invoice integration developers.
 */
export class CreditNoteRequestDto extends ProformaInvoiceRequestDto {
  /** Reference to the parent invoice being credited */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Parent Invoice ID',
    description: 'Reference to the parent invoice being credited.',
    type: 'string',
  })
  parentInvoiceId!: string;
}
```
