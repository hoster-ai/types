# IsMoneyAmount, MatchesAmount, sumOf

**Description:** Class-validator decorators for amounts: IsMoneyAmount (a required 2dp amount, zero or positive), MatchesAmount (within 0.01 of a computed value) and the sumOf helper.

**Source:** `decorators/is-money-amount.validator.ts`

**Language:** typescript

## Code

```typescript
import {
  IsDefined,
  IsNumber,
  Min,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { AMOUNT_TOLERANCE } from '../helpers/vat-treatment.helper';
import { MaxDecimalPlaces } from './max-decimal-places.validator';

/**
 * A required amount in decimal major units: a number, zero or positive, with
 * at most two decimal places.
 */
export function IsMoneyAmount() {
  return function (object: object, propertyName: string) {
    for (const decorator of [
      IsDefined(),
      IsNumber(),
      MaxDecimalPlaces(2),
      Min(0),
    ]) {
      decorator(object, propertyName);
    }
  };
}

/**
 * Checks that an amount is within `AMOUNT_TOLERANCE` (0.01) of the value
 * `expected` computes from the object. When `expected` gives no finite number
 * (an input it reads is missing or invalid) the check is skipped: that input's
 * own validation reports it.
 */
export function MatchesAmount<T extends object>(
  expected: (object: T) => number,
  description: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'matchesAmount',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [description],
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          const target = expected(args.object as T);
          if (!Number.isFinite(target)) return true;
          return (
            typeof value === 'number' &&
            Math.abs(value - target) <= AMOUNT_TOLERANCE + 1e-9
          );
        },
        defaultMessage() {
          return `$property must equal ${description} within ${AMOUNT_TOLERANCE}`;
        },
      },
    });
  };
}

/** Sum of `key` over the objects of `items`; NaN when any is not a number. */
export const sumOf = (items: unknown, key: string): number =>
  Array.isArray(items)
    ? items.reduce<number>((sum, item) => {
        const value = (item as Record<string, unknown> | null)?.[key];
        return typeof value === 'number' ? sum + value : NaN;
      }, 0)
    : NaN;
```
