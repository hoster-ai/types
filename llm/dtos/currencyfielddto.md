# CurrencyFieldDto

**Description:** Currency selection field. Discriminator type='CURRENCY'. Value is an ISO 4217 currency code (CurrencyEnum).

**Source:** `dtos/fields/currency-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { Equals, IsEnum, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { CurrencyEnum } from '../../enums/currency.enum';

/**
 * Currency selection field. Value is an ISO 4217 currency code.
 */
export class CurrencyFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('CURRENCY')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'CURRENCY' for this DTO.",
    type: 'string',
    enum: ['CURRENCY'],
  })
  type: 'CURRENCY' = 'CURRENCY' as const;

  /**
   * Value of the field — ISO 4217 currency code.
   */
  @IsEnum(CurrencyEnum)
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'ISO 4217 currency code.',
    type: 'string',
    enum: Object.values(CurrencyEnum),
  })
  value?: string;
}
```
