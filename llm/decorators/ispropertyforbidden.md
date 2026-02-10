# IsPropertyForbidden

**Description:** Custom class-validator decorator: IsPropertyForbidden

**Source:** `decorators/is-property-forbidden.validator.ts`

**Language:** typescript

## Code

```typescript
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPropertyForbidden(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPropertyForbidden',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(_value: any, args: ValidationArguments) {
          return !(property in args.object);
        },
        defaultMessage(_args: ValidationArguments) {
          return `Property '${property}' is not allowed`;
        },
      },
    });
  };
}
```

