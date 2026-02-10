# IsOneOf

**Description:** Custom class-validator decorator: IsOneOf

**Source:** `decorators/is-one-of.validator.ts`

**Language:** typescript

## Code

```typescript
import { ValidationArguments, ValidationOptions, registerDecorator } from "class-validator";


export function IsOneOf(validClasses: Function[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOneOf',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          return validClasses.some(cls => value instanceof cls);
        },
      },
    });
  };
}
```

