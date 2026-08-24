# Custom Decorator Pattern

Custom `class-validator` decorators live under `decorators/`. Use them when validation depends on more than one field, or when a reusable rule is needed across DTOs (e.g. `@IsOneOf`, `@AllOrNone`, `@AtLeastOneNonEmpty`, `@UniqueFieldInArray`, `@IsPropertyForbidden`, `@MinLessOrEqual`).

## File naming

- Implementation: `decorators/<kebab-name>.validator.ts`
- Spec: `decorators/<kebab-name>-validator.spec.ts`

(Yes — the spec uses `-validator.spec.ts` while the impl uses `.validator.ts`. Match existing siblings.)

## Implementation template

```ts
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsExample(
  arg1: SomeType,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isExample',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          // return true if valid, false otherwise
          return /* boolean */ true;
        },
        // Optional default message:
        // defaultMessage(args: ValidationArguments) { return `${args.property} is invalid`; }
      },
    });
  };
}
```

Conventions:

- Decorator function name: `PascalCase` (`IsOneOf`, `AllOrNone`).
- Internal `name:` field on `registerDecorator`: `camelCase` matching the decorator name (`isOneOf`).
- Second parameter is always `validationOptions?: ValidationOptions` so callers can pass `{ message: '...' }`.
- For decorators that compare against sibling properties, use `args.object` inside `validate`.

## Spec template

```ts
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsExample } from '../decorators/is-example.validator';

class TestDto {
  @IsExample(/* config */, { message: 'custom message' })
  prop!: any;
}

describe('IsExample decorator', () => {
  const cases: [any, boolean][] = [
    [/* valid input */, true],
    [/* invalid input */, false],
  ];

  it.each(cases)('validates %p as %p', async (value, valid) => {
    const dto = plainToInstance(TestDto, { prop: value });
    const errors = await validate(dto);
    if (valid) expect(errors.length).toBe(0);
    else {
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isExample');
    }
  });

  it('returns custom message', async () => {
    const dto = plainToInstance(TestDto, { prop: /* invalid */ });
    const errors = await validate(dto);
    expect(errors[0].constraints?.isExample).toBe('custom message');
  });
});
```

## Checklist

- [ ] Decorator exported from `decorators/<name>.validator.ts`
- [ ] Spec covers valid + invalid cases (use `it.each`) and the custom message
- [ ] Decorator exported via `index.ts` if intended for downstream use
- [ ] LLM docs entry created at `llm/decorators/<lowercasename>.md` and indexed in `llm.txt` if public
