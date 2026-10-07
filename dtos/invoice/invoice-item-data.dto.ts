import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
  ValidateIf,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { InvoiceItemActionsEnum } from '../../enums/invoice/invoice-item-actions.enum';
import { VatTreatmentEnum } from '../../enums/invoice/vat-treatment.enum';
import { requiresExemptionReason } from '../../helpers/vat-treatment.helper';
import { ItemDataDto } from '../item-data.dto';
import { MaxDecimalPlaces } from '../../decorators/max-decimal-places.validator';

/**
 * Order product item data sent to invoice integrations.
 * Uses invoice-specific actions to avoid confusion with product integration actions.
 *
 * Carries the line's VAT as decided by the tax integration. Amounts are decimal
 * major units (e.g. 12.40), up to two decimal places — not cents.
 * `netAmount + vatAmount` is the line's gross amount.
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
   * Line amount before VAT, after discounts. Decimal major units, up to two
   * decimal places.
   */
  @IsDefined()
  @IsNumber()
  @MaxDecimalPlaces(2)
  @Min(0)
  @JSONSchema({
    title: 'Net Amount',
    description:
      'Line amount before VAT, after discounts. Decimal major units (not cents), up to two decimal places. netAmount + vatAmount = the line gross amount.',
    type: 'number',
    minimum: 0,
  })
  netAmount!: number;

  /**
   * VAT rate of the line, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsDefined()
  @IsNumber()
  @MaxDecimalPlaces(2)
  @Min(0)
  @Max(100)
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
   * VAT charged on the line. Decimal major units, up to two decimal places.
   */
  @IsDefined()
  @IsNumber()
  @MaxDecimalPlaces(2)
  @Min(0)
  @JSONSchema({
    title: 'VAT Amount',
    description:
      'VAT charged on the line. Decimal major units (not cents), up to two decimal places. netAmount + vatAmount = the line gross amount.',
    type: 'number',
    minimum: 0,
  })
  vatAmount!: number;

  /** How VAT applies to the line */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @JSONSchema({
    title: 'Treatment',
    description: 'How VAT applies to the line.',
    $ref: '#/components/schemas/VatTreatmentEnum',
  })
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged on the line. Required when `vatRate` is 0 and
   * `treatment` is not `domestic`.
   */
  @ValidateIf(
    (item: InvoiceItemDataDto) =>
      requiresExemptionReason(item) || item.exemptionReason != null,
  )
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Exemption Reason',
    description:
      'Why no VAT is charged on the line (e.g. the legal reference printed on the invoice). Required when vatRate is 0 and treatment is not domestic.',
    type: 'string',
  })
  exemptionReason?: string;
}
