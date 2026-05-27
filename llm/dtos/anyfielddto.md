# AnyFieldDto

**Description:** Discriminated union of every concrete field DTO. Discriminator is the string-literal 'type' property. Also exports FIELD_DTO_CLASSES runtime registry used by the dispatcher validator and the OpenAPI schema generator.

**Source:** `dtos/fields/any-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { BooleanFieldDto } from './boolean-field.dto';
import { TextFieldDto } from './text-field.dto';
import { TextareaFieldDto } from './textarea-field.dto';
import { NumberFieldDto } from './number-field.dto';
import { PhoneFieldDto } from './phone-field.dto';
import { EmailFieldDto } from './email-field.dto';
import { UrlFieldDto } from './url-field.dto';
import { CountriesFieldDto } from './countries-field.dto';
import { CurrencyFieldDto } from './currency-field.dto';
import { DateFieldDto } from './date-field.dto';
import { PasswordFieldDto } from './password-field.dto';
import { SelectFieldDto } from './select-field.dto';
import { MultiSelectFieldDto } from './multi-select-field.dto';

/**
 * Discriminated union of every concrete field DTO. Discriminator is the string-literal `type`.
 */
export type AnyFieldDto =
  | BooleanFieldDto
  | TextFieldDto
  | TextareaFieldDto
  | NumberFieldDto
  | PhoneFieldDto
  | EmailFieldDto
  | UrlFieldDto
  | CountriesFieldDto
  | CurrencyFieldDto
  | DateFieldDto
  | PasswordFieldDto
  | SelectFieldDto
  | MultiSelectFieldDto;

/**
 * Runtime registry mapping each `type` literal to its concrete class.
 * Used by the dispatcher validator and the OpenAPI schema generator to build the
 * `oneOf` / `discriminator` schema for `AnyFieldDto`.
 */
export const FIELD_DTO_CLASSES = {
  BOOLEAN: BooleanFieldDto,
  TEXT: TextFieldDto,
  TEXTAREA: TextareaFieldDto,
  NUMBER: NumberFieldDto,
  PHONE: PhoneFieldDto,
  EMAIL: EmailFieldDto,
  URL: UrlFieldDto,
  COUNTRIES: CountriesFieldDto,
  CURRENCY: CurrencyFieldDto,
  DATE: DateFieldDto,
  PASSWORD: PasswordFieldDto,
  SELECT: SelectFieldDto,
  MULTI_SELECT: MultiSelectFieldDto,
} as const;

export type FieldTypeLiteral = keyof typeof FIELD_DTO_CLASSES;
```
