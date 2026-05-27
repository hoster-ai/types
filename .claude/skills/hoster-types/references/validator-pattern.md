# Validator + Spec Pattern

Every public DTO has a matching validator function under `validators/` and a co-located `.spec.ts`.

## File naming

Match the sibling file in the same folder — both `kebab-case-validator.ts` and `kebab-case.validator.ts` exist in the repo. When unsure:

- New domain/area without sibling → `<name>-validator.ts`.
- Adding next to an existing validator that uses `.validator.ts` → use `.validator.ts`.

Spec file: same basename + `.spec.ts`.

## Validator template

```ts
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FooDto } from '../dtos/foo.dto';

/**
 * Validates a FooDto object using class-validator decorators.
 *
 * @param data The object to validate as a FooDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateFooDto(data: object): ValidationError[] {
  const dto = plainToInstance(FooDto, data);
  const errors = validateSync(dto);

  return errors;
}
```

Validators are intentionally thin. No custom logic — all rules belong on the DTO via decorators. If logic is conditional across multiple fields, write a custom decorator under `decorators/` and use it on the DTO.

## Spec template

```ts
import 'reflect-metadata';
import { validateFooDto } from './foo-validator';
// ...enum imports needed by the fixture

const baseValidDto = {
  // minimum set of required fields with valid values
};

describe('FooDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateFooDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with all optional fields set', () => {
      const dto = { ...baseValidDto /* every optional field */ };
      expect(validateFooDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateFooDto({});
      const requiredProps = ['field1', 'field2' /* ... */];
      for (const prop of requiredProps) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });

    it('should return error when <field> is missing', () => {
      const { field1, ...dto } = baseValidDto;
      const errors = validateFooDto(dto);
      expect(errors.some((e) => e.property === 'field1')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid email', () => {
      const dto = { ...baseValidDto, email: 'not-an-email' };
      const errors = validateFooDto(dto);
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    // ...one test per non-trivial constraint
  });
});
```

## Spec conventions

- `import 'reflect-metadata';` MUST be the first line of every spec — class-validator needs the metadata polyfill, and Jest tests run in isolation.
- Use a `baseValidDto` constant and spread it with overrides. Do not duplicate full fixtures per test.
- Match errors by `property` name, not array index — order is not guaranteed.
- Use `expect(errors.some((e) => e.property === 'x')).toBe(true)` rather than `errors[0].property`.
- Group tests under three `describe` blocks: `Valid cases`, `Missing required fields`, `Invalid field values`. Add more groups only when warranted (e.g. `Conditional logic`).
- Cover every required field (missing-each test) and every non-trivial constraint (`@IsEmail`, `@MaxLength`, `@IsEnum`, custom decorators).
