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
