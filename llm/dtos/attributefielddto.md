# AttributeFieldDto

**Description:** Indicates if the field is visible in orders

**Source:** `dtos/attribute-field.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsBoolean, IsNumber, IsOptional } from "class-validator";
import { JSONSchema } from 'class-validator-jsonschema';
import { FieldDto } from "./field.dto";
import { AllOrNoneProperty } from "../decorators/all-or-none.validator";
import { MinLessOrEqualMaxProperty } from "../decorators/min-less-or-equal.validator";

@AllOrNoneProperty(['repeatableMin', 'repeatableMax'])
@MinLessOrEqualMaxProperty(['repeatableMin', 'repeatableMax'])
export class AttributeFieldDto extends FieldDto {

  /**
   * Indicates if the field is visible in orders
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Visible In Order',
    description: 'Whether the field is visible in order view.',
    type: 'boolean',
  })
  visibleInOrder?: boolean;

  /**
   * Indicates if the field is visible in client panel
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Visible In Client Panel',
    description: 'Whether the field is visible in the client panel.',
    type: 'boolean',
  })
  visibleInClientPanel?: boolean;

  /**
   * Minimum repeats for repeatable fields
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Repeatable Min',
    description: 'Minimum repeats for repeatable fields.',
    type: 'number',
  })
  repeatableMin?: number;

  /**
   * Maximum repeats for repeatable fields
   */
  @IsOptional()
  @IsNumber()
  @JSONSchema({
    title: 'Repeatable Max',
    description: 'Maximum repeats for repeatable fields.',
    type: 'number',
  })
  repeatableMax?: number;
}
```

