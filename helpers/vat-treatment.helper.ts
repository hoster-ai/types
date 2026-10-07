import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

/** Longest `exemptionReason` hoster.ai accepts. */
export const EXEMPTION_REASON_MAX_LENGTH = 500;

/** How far, in major units, an amount may be off its expected value. */
export const AMOUNT_TOLERANCE = 0.01;

/** Treatments under which no VAT is charged, so the rate must be 0. */
export const ZERO_RATE_TREATMENTS: readonly VatTreatmentEnum[] = [
  VatTreatmentEnum.REVERSE_CHARGE,
  VatTreatmentEnum.OUTSIDE_SCOPE,
  VatTreatmentEnum.EXEMPT,
];

/**
 * Whether a VAT line must explain why no VAT is charged: a 0% rate with a
 * treatment other than `domestic` needs an `exemptionReason`.
 */
export const requiresExemptionReason = (line: {
  vatRate?: unknown;
  treatment?: unknown;
}): boolean =>
  line.vatRate === 0 && line.treatment !== VatTreatmentEnum.DOMESTIC;

/** Rounds a non-negative amount half up to two decimals (12.345 → 12.35). */
export const roundAmount = (amount: number): number =>
  Math.round((amount + Number.EPSILON) * 100) / 100;
