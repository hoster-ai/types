# TextFieldDto

**Description:** Single-line text input field. Discriminator type='TEXT'. Optional minLength/maxLength/regexValidation.

**Source:** `dtos/fields/text-field.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  ArrayMinSize,
  Equals,
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { MultilangTextDto } from '../multilang-text.dto';
import { IsRegex } from '../../decorators/is-regex.validator';

/**
 * Single-line text input field.
 */
export class TextFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('TEXT')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'TEXT' for this DTO.",
    type: 'string',
    enum: ['TEXT'],
  })
  type: 'TEXT' = 'TEXT' as const;

  /**
   * Value of the field.
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Text value of the field.',
    type: 'string',
  })
  value?: string;

  /**
   * Minimum allowed character length.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  @JSONSchema({
    title: 'Minimum Length',
    description: 'Minimum allowed character length.',
    type: 'integer',
    minimum: 0,
  })
  minLength?: number;

  /**
   * Maximum allowed character length.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  @JSONSchema({
    title: 'Maximum Length',
    description: 'Maximum allowed character length.',
    type: 'integer',
    minimum: 0,
  })
  maxLength?: number;

  /**
   * Optional regex pattern to validate input.
   */
  @IsString()
  @IsRegex()
  @IsOptional()
  @JSONSchema({
    title: 'Regex Validation',
    description: 'Optional regex to validate input.',
    type: 'string',
    example: '^[A-Za-z0-9_-]+$',
  })
  regexValidation?: string;

  /**
   * Localized error message shown when regex validation fails.
   */
  @ValidateIf((o) => !!o.regexValidation)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @JSONSchema({
    title: 'Regex Validation Error Message',
    description: 'Localized error message shown when regex validation fails.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  regexValidationErrorMessage?: MultilangTextDto[];
}
```
