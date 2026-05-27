import { Equals, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { FieldOptionDto } from '../field-option.dto';

/**
 * Single-choice select field.
 */
export class SelectFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('SELECT')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'SELECT' for this DTO.",
    type: 'string',
    enum: ['SELECT'],
  })
  type: 'SELECT' = 'SELECT' as const;

  /**
   * Value of the field — the selected option.
   */
  @ValidateNested()
  @Type(() => FieldOptionDto)
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Selected option.',
    $ref: '#/components/schemas/FieldOptionDto',
  })
  value?: FieldOptionDto;
}
