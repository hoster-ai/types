# MultiSelectFieldDto

**Description:** Multi-choice select field. Discriminator type='MULTI_SELECT'. Value is an array of FieldOptionDto. Optional minSelections/maxSelections bounds.

**Source:** `dtos/fields/multi-select-field.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  ArrayMinSize,
  Equals,
  IsArray,
  IsDefined,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { FieldOptionDto } from '../field-option.dto';
import { MinLessOrEqualMaxProperty } from '../../decorators/min-less-or-equal.validator';

/**
 * Multi-choice select field.
 */
@MinLessOrEqualMaxProperty(['minSelections', 'maxSelections'])
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
   * The options the user can choose from.
   */
  @ValidateNested({ each: true })
  @Type(() => FieldOptionDto)
  @IsArray()
  @ArrayMinSize(1)
  @IsDefined()
  @JSONSchema({
    title: 'Options',
    description: 'The options the user can choose from.',
    type: 'array',
    items: { $ref: '#/components/schemas/FieldOptionDto' },
    minItems: 1,
  })
  options!: FieldOptionDto[];

  /**
   * Minimum number of options that must be selected.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  @JSONSchema({
    title: 'Minimum Selections',
    description: 'Minimum number of options that must be selected.',
    type: 'integer',
    minimum: 0,
  })
  minSelections?: number;

  /**
   * Maximum number of options that may be selected.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  @JSONSchema({
    title: 'Maximum Selections',
    description: 'Maximum number of options that may be selected.',
    type: 'integer',
    minimum: 0,
  })
  maxSelections?: number;

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
