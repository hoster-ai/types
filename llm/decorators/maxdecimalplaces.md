# MaxDecimalPlaces

**Description:** Custom class-validator decorator that validates a number has at most N decimal places, without throwing on exponential numbers like 1e-7.

**Source:** `decorators/max-decimal-places.validator.ts`

**Language:** typescript

## Code

```typescript
import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Checks that a number has at most `places` decimal places. Unlike
 * `IsNumber({ maxDecimalPlaces })`, it does not throw on numbers whose
 * string form is exponential (e.g. `1e-7`).
 */
export function MaxDecimalPlaces(
  places: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxDecimalPlaces',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [places],
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return (
            typeof value === 'number' &&
            Number.isFinite(value) &&
            Number(value.toFixed(places)) === value
          );
        },
        defaultMessage() {
          return `$property must have at most ${places} decimal places`;
        },
      },
    });
  };
}
```
