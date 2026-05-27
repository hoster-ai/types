import { Equals, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { MinLessOrEqualMaxProperty } from '../../decorators/min-less-or-equal.validator';

/**
 * Numeric input field.
 */
@MinLessOrEqualMaxProperty(['min', 'max'])
export class NumberFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('NUMBER')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'NUMBER' for this DTO.",
    type: 'string',
    enum: ['NUMBER'],
  })
  type: 'NUMBER' = 'NUMBER' as const;

  /**
   * Value of the field.
   */
  @IsNumber()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Numeric value of the field.',
    type: 'number',
  })
  value?: number;

  /**
   * Minimum allowed value.
   */
  @IsNumber()
  @IsOptional()
  @JSONSchema({
    title: 'Minimum',
    description: 'Minimum allowed value.',
    type: 'number',
  })
  min?: number;

  /**
   * Maximum allowed value.
   */
  @IsNumber()
  @IsOptional()
  @JSONSchema({
    title: 'Maximum',
    description: 'Maximum allowed value.',
    type: 'number',
  })
  max?: number;

  /**
   * When true, only integer values are allowed.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Integer Only',
    description: 'When true, only integer values are allowed.',
    type: 'boolean',
  })
  integer?: boolean;
}
