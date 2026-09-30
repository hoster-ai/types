/**
 * How VAT applies to a sale, as decided by the tax integration.
 *
 * - `domestic`: seller and buyer in the same country; the seller's local rate.
 * - `reverse_charge`: cross-border B2B with a valid VAT number; the buyer accounts for the VAT.
 * - `oss`: cross-border B2C inside the EU; the buyer country's rate, declared through OSS.
 * - `outside_scope`: the buyer is outside the seller's VAT area (e.g. an export); no VAT.
 * - `exempt`: the supply is exempt by law; no VAT.
 */
export enum VatTreatmentEnum {
  DOMESTIC = 'domestic',
  REVERSE_CHARGE = 'reverse_charge',
  OSS = 'oss',
  OUTSIDE_SCOPE = 'outside_scope',
  EXEMPT = 'exempt',
}
