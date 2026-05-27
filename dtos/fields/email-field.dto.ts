import { Equals, IsEmail, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';

/**
 * Email input field.
 */
export class EmailFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('EMAIL')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'EMAIL' for this DTO.",
    type: 'string',
    enum: ['EMAIL'],
  })
  type: 'EMAIL' = 'EMAIL' as const;

  /**
   * Value of the field.
   */
  @IsEmail()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Email address.',
    type: 'string',
    format: 'email',
  })
  value?: string;
}
