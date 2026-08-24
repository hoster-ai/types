import { Equals, IsBoolean, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';

/**
 * Boolean field. Represents a single on/off value (e.g. checkbox, switch).
 */
export class BooleanFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('BOOLEAN')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'BOOLEAN' for this DTO.",
    type: 'string',
    enum: ['BOOLEAN'],
  })
  type: 'BOOLEAN' = 'BOOLEAN' as const;

  /**
   * Value of the field.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Boolean value of the field.',
    type: 'boolean',
  })
  value?: boolean;
}
