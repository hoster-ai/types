import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

/**
 * Whether a VAT line must explain why no VAT is charged: a 0% rate with a
 * treatment other than `domestic` needs an `exemptionReason`.
 */
export const requiresExemptionReason = (line: {
  vatRate?: unknown;
  treatment?: unknown;
}): boolean =>
  line.vatRate === 0 && line.treatment !== VatTreatmentEnum.DOMESTIC;
