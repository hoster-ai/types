# IsStringOrStringArray

**Description:** Custom class-validator decorator that validates a value is a string or an array whose items are all strings. Adds no JSON Schema keywords; pair it with a `@JSONSchema` `oneOf`.

**Source:** `decorators/is-string-or-string-array.validator.ts`

**Language:** typescript

## Code

```typescript
import { registerDecorator, ValidationOptions } from 'class-validator';

/**
 * Accepts a single string or an array whose items are all strings.
 *
 * Mirrors a `oneOf: [string, array of string]` schema. The schema itself comes
 * from `@JSONSchema`: this decorator adds no JSON Schema keywords of its own, so
 * the generated `oneOf` has no contradicting `type`/`items` next to it.
 */
export function IsStringOrStringArray(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStringOrStringArray',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return (
            typeof value === 'string' ||
            (Array.isArray(value) &&
              value.every((item) => typeof item === 'string'))
          );
        },
        defaultMessage() {
          return '$property must be a string or an array of strings';
        },
      },
    });
  };
}
```
