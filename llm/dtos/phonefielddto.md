# PhoneFieldDto

**Description:** Phone number field. Discriminator type='PHONE'. Value must be in E.164 format (validated by @IsE164).

**Source:** `dtos/fields/phone-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { Equals, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { IsE164 } from '../../decorators/is-e164.validator';

/**
 * Phone number field. Value must be in E.164 format (e.g. +14155552671).
 */
export class PhoneFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('PHONE')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'PHONE' for this DTO.",
    type: 'string',
    enum: ['PHONE'],
  })
  type: 'PHONE' = 'PHONE' as const;

  /**
   * Value of the field in E.164 format.
   */
  @IsE164()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Phone number in E.164 format (e.g. +14155552671).',
    type: 'string',
    example: '+14155552671',
  })
  value?: string;
}
```
