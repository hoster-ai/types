import { Equals, IsISO8601, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';

/**
 * Date input field. Value is an ISO 8601 string.
 */
export class DateFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('DATE')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'DATE' for this DTO.",
    type: 'string',
    enum: ['DATE'],
  })
  type: 'DATE' = 'DATE' as const;

  /**
   * Value of the field — ISO 8601 date or date-time.
   */
  @IsISO8601()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'ISO 8601 date or date-time string.',
    type: 'string',
    format: 'date-time',
  })
  value?: string;
}
