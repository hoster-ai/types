# TransactionDataDto

**Description:** Transaction details related to the invoice. Contains payment and transaction information for the document being issued.

**Source:** `dtos/invoice/transaction-data.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';

/**
 * Transaction details related to the invoice.
 * Contains payment and transaction information for the document being issued.
 */
export class TransactionData {
  /** Unique identifier for the transaction */
  @IsString()
  @IsNotEmpty()
  transactionId!: string;

  /** Transaction amount */
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  /** Payment method used for the transaction */
  @IsString()
  @IsNotEmpty()
  paymentMethod!: string;

  /** Transaction date */
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date!: Date;
}
```

