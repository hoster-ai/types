# MultiSelectFieldDto

**Description:** Multi-choice select field. Discriminator type='MULTI_SELECT'. Value is an array of FieldOptionDto.

**Source:** `dtos/fields/multi-select-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { Equals, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { FieldOptionDto } from '../field-option.dto';

/**
 * Multi-choice select field.
 */
export class MultiSelectFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('MULTI_SELECT')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'MULTI_SELECT' for this DTO.",
    type: 'string',
    enum: ['MULTI_SELECT'],
  })
  type: 'MULTI_SELECT' = 'MULTI_SELECT' as const;

  /**
   * Value of the field — array of selected options.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldOptionDto)
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Array of selected options.',
    type: 'array',
    items: { $ref: '#/components/schemas/FieldOptionDto' },
  })
  value?: FieldOptionDto[];
}
```
