# InvoiceItemDataDto

**Description:** Order product item data sent to invoice integrations, with invoice-specific actions and the line VAT (netAmount, vatRate, vatAmount, treatment, exemptionReason). Amounts are decimal major units, 2dp; netAmount + vatAmount = line gross.

**Source:** `dtos/invoice/invoice-item-data.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsEnum } from 'class-validator';
import { InvoiceItemActionsEnum } from '../../enums/invoice/invoice-item-actions.enum';
import { VatTreatmentEnum } from '../../enums/invoice/vat-treatment.enum';
import { roundAmount } from '../../helpers/vat-treatment.helper';
import { ItemDataDto } from '../item-data.dto';
import {
  IsMoneyAmount,
  MatchesAmount,
} from '../../decorators/is-money-amount.validator';
import {
  IsExemptionReason,
  IsVatRate,
  MatchesVatTreatment,
} from '../../decorators/vat-line.validator';

/**
 * Order product item data sent to invoice integrations.
 * Uses invoice-specific actions to avoid confusion with product integration actions.
 *
 * Carries the line's VAT as decided by the tax integration. Amounts are decimal
 * major units (e.g. 12.40), up to two decimal places — not cents — and zero or
 * positive, on a credit note too. `netAmount + vatAmount` is the line's gross
 * amount, and `vatAmount` is `netAmount × vatRate / 100` rounded half up, within
 * 0.01.
 *
 * `netAmount` is what the line bills. The inherited `price`, `fee`,
 * `couponDiscountValue`, `upgradeRemainder` and `subTotal` only show how
 * hoster.ai reached it and are informational.
 */
export class InvoiceItemDataDto extends ItemDataDto {
  /** Invoice-specific action type for this item */
  @IsDefined()
  @IsEnum(InvoiceItemActionsEnum)
  action!: InvoiceItemActionsEnum;

  /**
   * Line amount before VAT, after discounts: what the line bills. Decimal major
   * units, up to two decimal places.
   */
  @IsMoneyAmount()
  netAmount!: number;

  /**
   * VAT rate of the line, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsVatRate()
  vatRate!: number;

  /**
   * VAT charged on the line: `netAmount × vatRate / 100` rounded half up, within
   * 0.01. Decimal major units, up to two decimal places.
   */
  @IsMoneyAmount()
  @MatchesAmount(
    (item: InvoiceItemDataDto) =>
      roundAmount((item.netAmount * item.vatRate) / 100),
    'netAmount × vatRate / 100',
  )
  vatAmount!: number;

  /**
   * How VAT applies to the line. `reverse_charge`, `outside_scope` and `exempt`
   * charge no VAT, so they come with `vatRate` 0.
   */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @MatchesVatTreatment()
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged on the line. Required when `vatRate` is 0 and
   * `treatment` is not `domestic`: then non-blank, at most 500 characters.
   * Absent or null elsewhere.
   */
  @IsExemptionReason()
  exemptionReason?: string;
}
```
