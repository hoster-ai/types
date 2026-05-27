# TransactionData

**Description:** Transaction details related to the invoice. Contains payment and transaction information for the document being issued.

**Source:** `dtos/invoice/transaction-data.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Transaction details related to the invoice.
 * Contains payment and transaction information for the document being issued.
 */
export class TransactionData {
  /** Unique identifier for the transaction */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Transaction ID',
    description: 'Unique identifier for the transaction.',
    type: 'string',
  })
  transactionId!: string;

  /** Transaction amount */
  @IsNumber()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Amount',
    description: 'Transaction amount.',
    type: 'number',
  })
  amount!: number;

  /** Payment method used for the transaction */
  //TODO Να μπει το enum
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Payment Method',
    description: 'Payment method used for the transaction.',
    type: 'string',
  })
  paymentMethod!: string;

  /** Transaction date */
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @JSONSchema({
    title: 'Date',
    description: 'Transaction date.',
    type: 'string',
    format: 'date-time',
  })
  date!: Date;
}
```
