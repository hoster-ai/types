# UrlFieldDto

**Description:** URL input field. Discriminator type='URL'. Value validated by @IsUrl.

**Source:** `dtos/fields/url-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { Equals, IsOptional, IsUrl } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';

/**
 * URL input field.
 */
export class UrlFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('URL')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'URL' for this DTO.",
    type: 'string',
    enum: ['URL'],
  })
  type: 'URL' = 'URL' as const;

  /**
   * Value of the field.
   */
  @IsUrl()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'URL.',
    type: 'string',
    format: 'uri',
  })
  value?: string;
}
```
