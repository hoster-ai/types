# DTO Pattern

DTOs combine `class-validator` decorators (runtime validation) + `@JSONSchema` decorators (OpenAPI schema generation) + TSDoc comments (developer docs).

## Imports (typical)

```ts
import {
  IsString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsDefined,
  IsArray,
  IsObject,
  IsNumber,
  IsEmail,
  IsPhoneNumber,
  ValidateNested,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
// ...domain imports (other DTOs, enums)
```

Do **not** import `reflect-metadata` inside a DTO file — it is imported once in `index.ts`.

## Class shape

```ts
/**
 * One-line description of what this DTO represents.
 * Optional second line with more context — used for both TSDoc and the
 * llm/<name>.md description.
 */
export class FooDto {
  /** Short field doc — keep one-line if possible. */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Field Title',
    description: 'Field description ending with a period.',
    type: 'string',
  })
  fieldName!: string;

  /** Optional field. */
  @IsString()
  @IsOptional()
  @MaxLength(250)
  @JSONSchema({
    title: 'Optional Field',
    description: 'Optional field description.',
    type: 'string',
    maxLength: 250,
  })
  optionalField?: string;
}
```

## Required vs optional

- Required: `fieldName!: T;` + `@IsNotEmpty()` (strings) or `@IsDefined()` (objects/arrays/numbers/booleans).
- Optional: `fieldName?: T;` + `@IsOptional()`.

## Common decorator combos

### Enum field

```ts
@IsEnum(CountryEnum)
@IsNotEmpty()
@JSONSchema({
  title: 'Country',
  description: 'Country code.',
  type: 'string',
  enum: Object.values(CountryEnum),
})
country!: CountryEnum;
```

### Nested DTO (single)

```ts
@IsDefined()
@IsObject()
@ValidateNested()
@Type(() => CompanyDataDto)
@JSONSchema({
  title: 'Company',
  description: 'Company data.',
  $ref: '#/components/schemas/CompanyDataDto',
})
company!: CompanyDataDto;
```

### Array of nested DTOs

```ts
@IsDefined()
@IsArray()
@ValidateNested({ each: true })
@Type(() => InvoiceItemDataDto)
@JSONSchema({
  title: 'Items',
  description: 'Line items included in the invoice.',
  type: 'array',
  items: { $ref: '#/components/schemas/InvoiceItemDataDto' },
})
items!: InvoiceItemDataDto[];
```

### String with length bounds

```ts
@IsString()
@IsNotEmpty()
@MinLength(1)
@MaxLength(250)
@JSONSchema({
  title: 'City',
  description: 'City name.',
  type: 'string',
  minLength: 1,
  maxLength: 250,
})
city!: string;
```

### Email / phone

```ts
@IsEmail()
@IsNotEmpty()
@JSONSchema({ title: 'Email', description: "Contact's email.", type: 'string', format: 'email' })
email!: string;

@IsPhoneNumber()
@IsNotEmpty()
@JSONSchema({ title: 'Telephone', description: 'Phone in international format.', type: 'string' })
telephone!: string;
```

## Decorator ordering convention

1. `class-validator` rule decorators (`@IsString`, `@IsEnum`, …)
2. Presence decorators (`@IsNotEmpty` / `@IsOptional` / `@IsDefined`)
3. Length / range decorators (`@MinLength`, `@MaxLength`, `@Min`, `@Max`)
4. `@ValidateNested()` / `@Type()` (for nested)
5. `@JSONSchema({...})` last

(Soft convention — match neighbours.)

## Abstract base DTOs

When several request DTOs share fields (e.g. invoice variants), extract an `abstract class XxxRequestDto` in `dtos/<domain>/requests/base-xxx-request.dto.ts` and have concrete classes `extends` it. See `dtos/invoice/requests/base-invoice-request.dto.ts`.

## `Dto` suffix on class names

Mixed in the repo. Rule of thumb: **match the closest neighbour in the same folder**. New invoice/product/notification DTOs almost always use `Dto`. A few legacy types (`InvoiceContactData`, `TransactionData`) do not — leave them as-is when editing.
