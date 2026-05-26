# Enum Pattern

All enums in this package are **string-valued TypeScript enums** with values matching the keys.

## Shape

```ts
export enum CurrencyEnum {
  EUR = 'EUR',
  USD = 'USD',
  GBP = 'GBP',
  // ...
}
```

## Conventions

- File: `enums/<kebab-name>.enum.ts`. Domain enums go in `enums/<domain>/<name>.enum.ts` (e.g. `enums/invoice/invoice-types.enum.ts`).
- Name: `PascalCaseEnum` — always with the `Enum` suffix.
- Keys: `UPPER_SNAKE_CASE`.
- Values: the same string as the key (`FOO = 'FOO'`). Do not use lowercase or numeric values.
- Alphabetize entries when there is no other natural order (country, currency are alphabetized). Domain-meaningful order (e.g. lifecycle stages) is acceptable when it carries semantics.
- Export from `index.ts` under the `// Enums` section. Keep that section alphabetized within sub-domains.

## When changing enum values

- Renaming/uppercasing a value is a **breaking change** for downstream services. Coordinate a version bump (`chore: bump version to x.y.z`) and update consumers.
- Recent precedent: commit `4b2390a` renamed `ProductItemActionsEnum` → `ProductActionsEnum` and uppercased its values.

## Usage in DTOs

```ts
@IsEnum(CurrencyEnum)
@IsNotEmpty()
@JSONSchema({
  title: 'Currency',
  description: 'Currency of the invoice.',
  type: 'string',
  enum: Object.values(CurrencyEnum),
})
currency!: CurrencyEnum;
```

`Object.values(CurrencyEnum)` is the canonical way to feed the JSONSchema `enum` field — never hand-list the values.
