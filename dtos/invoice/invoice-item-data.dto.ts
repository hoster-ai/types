import { IsDefined, IsEnum } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
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
  @JSONSchema({
    title: 'Action',
    description: 'Invoice-specific action type for this item.',
    $ref: '#/components/schemas/InvoiceItemActionsEnum',
  })
  action!: InvoiceItemActionsEnum;

  /**
   * Line amount before VAT, after discounts: what the line bills. Decimal major
   * units, up to two decimal places.
   */
  @IsMoneyAmount()
  @JSONSchema({
    title: 'Net Amount',
    description:
      'Line amount before VAT, after discounts: what the line bills. Decimal major units (not cents), up to two decimal places, zero or positive also on a credit note. netAmount + vatAmount = the line gross amount. price, fee, couponDiscountValue, upgradeRemainder and subTotal are informational.',
    type: 'number',
    minimum: 0,
  })
  netAmount!: number;

  /**
   * VAT rate of the line, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsVatRate()
  @JSONSchema({
    title: 'VAT Rate',
    description:
      'VAT rate of the line as a percentage (e.g. 24 for 24%), 0-100, up to two decimal places.',
    type: 'number',
    minimum: 0,
    maximum: 100,
  })
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
  @JSONSchema({
    title: 'VAT Amount',
    description:
      'VAT charged on the line: netAmount × vatRate / 100 rounded half up, within 0.01. Decimal major units (not cents), up to two decimal places. netAmount + vatAmount = the line gross amount.',
    type: 'number',
    minimum: 0,
  })
  vatAmount!: number;

  /**
   * How VAT applies to the line. `reverse_charge`, `outside_scope` and `exempt`
   * charge no VAT, so they come with `vatRate` 0.
   */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @MatchesVatTreatment()
  @JSONSchema({
    title: 'Treatment',
    description:
      'How VAT applies to the line. reverse_charge, outside_scope and exempt charge no VAT, so they come with vatRate 0.',
    $ref: '#/components/schemas/VatTreatmentEnum',
  })
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged on the line. Required when `vatRate` is 0 and
   * `treatment` is not `domestic`: then non-blank, at most 500 characters.
   * Absent or null elsewhere.
   */
  @IsExemptionReason()
  @JSONSchema({
    title: 'Exemption Reason',
    description:
      'Why no VAT is charged on the line (e.g. the legal reference printed on the invoice). Required when vatRate is 0 and treatment is not domestic: then non-blank, at most 500 characters. Absent or null elsewhere.',
    type: 'string',
    nullable: true,
  })
  exemptionReason?: string;
}
