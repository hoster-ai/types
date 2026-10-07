# BaseInvoiceRequestDto

**Description:** Common payload of every document request sent to invoice integrations. Amounts are decimal major units, 2dp (not cents); the lines sum to netTotal and vatTotal, and totalAmount = netTotal + vatTotal.

**Source:** `dtos/invoice/requests/base-invoice-request.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CompanyDataDto } from '../../company-data.dto';
import { InvoiceItemDataDto } from '../invoice-item-data.dto';
import { TransactionData } from '../transaction-data.dto';
import { InvoiceContactData } from '../../invoice-contact-data.dto';
import { CurrencyEnum } from '../../../enums/currency.enum';
import {
  IsMoneyAmount,
  MatchesAmount,
  sumOf,
} from '../../../decorators/is-money-amount.validator';

/**
 * Common payload of every document request sent to invoice integrations.
 *
 * Amounts are decimal major units (e.g. 12.40), up to two decimal places — not
 * cents — and zero or positive, on a credit note too: the document type makes it
 * a reversal. Per line `netAmount + vatAmount` is the line gross; the lines' sums
 * equal `netTotal` and `vatTotal`, and `totalAmount = netTotal + vatTotal`, each
 * within 0.01.
 */
export abstract class BaseInvoiceRequestDto {
  /**
   * The core's identifier for the document being issued.
   *
   * Optional, and echoed back by the integration only as context — the core uses it
   * as the write target when the outcome arrives, exactly as `ItemDataDto.itemId`
   * works for product actions. Without it the core has to smuggle its own id
   * alongside the contract payload (issue #27). NOT the same as `parentInvoiceId`,
   * which refers to the invoice being credited.
   */
  @IsOptional()
  @IsString()
  invoiceId?: string;

  /**
   * Company data
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => CompanyDataDto)
  company!: CompanyDataDto;

  /**
   * Invoice contact data (without invoiceContactId)
   */
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => InvoiceContactData)
  invoiceContact!: InvoiceContactData;

  @IsDefined()
  @IsEnum(CurrencyEnum)
  currency!: CurrencyEnum;

  /** Line items included in the invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceItemDataDto)
  items!: InvoiceItemDataDto[];

  /** List of transactions associated with this invoice */
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransactionData)
  transactions!: TransactionData[];

  /**
   * Sum of the lines' `netAmount`, within 0.01. Decimal major units, up to two
   * decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => sumOf(request.items, 'netAmount'),
    "the sum of the items' netAmount",
  )
  netTotal!: number;

  /**
   * Sum of the lines' `vatAmount`, within 0.01. Decimal major units, up to two
   * decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => sumOf(request.items, 'vatAmount'),
    "the sum of the items' vatAmount",
  )
  vatTotal!: number;

  /**
   * Gross invoice amount: `netTotal + vatTotal`, within 0.01. Decimal major
   * units, up to two decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (request: BaseInvoiceRequestDto) => request.netTotal + request.vatTotal,
    'netTotal + vatTotal',
  )
  totalAmount!: number;

  /**
   * Discount amount, already reflected in the lines' `netAmount`.
   */
  @IsMoneyAmount()
  discountAmount!: number;
}
```
