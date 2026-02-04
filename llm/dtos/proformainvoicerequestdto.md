# ProformaInvoiceRequestDto

**Description:** Request payload for creating a proforma invoice. Sent from hoster.ai to invoice integrations to issue a proforma document.

**Source:** `dtos/invoice/requests/proforma-invoice-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import { IsArray, IsDefined, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { InvoiceContactData } from "../../invoice-contact-data.dto";
import { InvoiceItemDataDto } from "../invoice-item-data.dto";
import { TransactionData } from "../transaction-data.dto";
import { CountryEnum } from '../../../enums/country.enum';

/**
 * Request payload for creating a proforma invoice.
 * Sent from hoster.ai to invoice integrations to issue a proforma document.
 */
export class ProformaInvoiceRequestDto {
  /** Unique identifier for the invoice */
  @IsDefined()
  @IsString()
  invoiceId!: string;

  /** Company identifier issuing the invoice */
  @IsDefined()
  @IsString()
  companyId!: string;

  /** Country where the company is registered */
  @IsDefined()
  @IsEnum(CountryEnum)
  companyCountry!: CountryEnum;

  /** List of transactions associated with this invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionData)
  transactions!: TransactionData[];

  /** Billing contact information for the invoice recipient */
  @IsDefined()
  @ValidateNested()
  @Type(() => InvoiceContactData)
  invoiceContact!: InvoiceContactData;

  /** Line items included in the invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDataDto)
  items!: InvoiceItemDataDto[];

  /** Total invoice amount */
  @IsDefined()
  @IsNumber()
  totalAmount!: number;
}
```

