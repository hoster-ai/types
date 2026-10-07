import {
  IsDefined,
  IsNumber,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidateIf,
  ValidationOptions,
} from 'class-validator';
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';
import {
  EXEMPTION_REASON_MAX_LENGTH,
  requiresExemptionReason,
  ZERO_RATE_TREATMENTS,
} from '../helpers/vat-treatment.helper';
import { MaxDecimalPlaces } from './max-decimal-places.validator';

/**
 * A required VAT rate: a percentage from 0 to 100 (24 means 24%) with at most
 * two decimal places.
 */
export function IsVatRate() {
  return function (object: object, propertyName: string) {
    for (const decorator of [
      IsDefined(),
      IsNumber(),
      MaxDecimalPlaces(2),
      Min(0),
      Max(100),
    ]) {
      decorator(object, propertyName);
    }
  };
}

/**
 * The `exemptionReason` of a VAT line: required when `vatRate` is 0 and
 * `treatment` is not `domestic` (also under `skipMissingProperties`), and then
 * a non-blank string of at most 500 characters. Elsewhere it may be absent or
 * null.
 */
export function IsExemptionReason() {
  return function (object: object, propertyName: string) {
    for (const decorator of [
      ValidateIf(
        (line: Record<string, unknown>) =>
          requiresExemptionReason(line) || line[propertyName] != null,
      ),
      IsDefined(),
      IsString(),
      Matches(/\S/, { message: '$property must not be blank' }),
      MaxLength(EXEMPTION_REASON_MAX_LENGTH),
    ]) {
      decorator(object, propertyName);
    }
  };
}

export interface MatchesVatTreatmentOptions {
  /** `reverse_charge` also needs `vatNumberValid: true` on the same object. */
  requireValidVatNumber?: boolean;
}

/**
 * Checks a `treatment` against the rest of its VAT line: `reverse_charge`,
 * `outside_scope` and `exempt` charge no VAT, so `vatRate` must be 0; with
 * `requireValidVatNumber`, `reverse_charge` also needs `vatNumberValid: true`.
 * A missing or non-numeric `vatRate` is left to its own validation.
 */
export function MatchesVatTreatment(
  options: MatchesVatTreatmentOptions = {},
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'matchesVatTreatment',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [options],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const line = args.object as Record<string, unknown>;
          if (
            ZERO_RATE_TREATMENTS.includes(value as VatTreatmentEnum) &&
            typeof line.vatRate === 'number' &&
            line.vatRate !== 0
          ) {
            return false;
          }
          return !(
            options.requireValidVatNumber &&
            value === VatTreatmentEnum.REVERSE_CHARGE &&
            line.vatNumberValid !== true
          );
        },
        defaultMessage(args: ValidationArguments) {
          return args.value === VatTreatmentEnum.REVERSE_CHARGE &&
            (args.object as Record<string, unknown>).vatRate === 0
            ? '$property reverse_charge requires vatNumberValid: true'
            : '$property $value charges no VAT, so vatRate must be 0';
        },
      },
    });
  };
}
