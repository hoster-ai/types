import { Equals, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';

/**
 * Password input field.
 *
 * This DTO intentionally does NOT enforce password strength rules — that is
 * the responsibility of the consuming application.
 */
export class PasswordFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('PASSWORD')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'PASSWORD' for this DTO.",
    type: 'string',
    enum: ['PASSWORD'],
  })
  type: 'PASSWORD' = 'PASSWORD' as const;

  /**
   * Value of the field.
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Password value.',
    type: 'string',
    format: 'password',
  })
  value?: string;

  /**
   * Minimum allowed length.
   */
  @IsInt()
  @Min(0)
  @IsOptional()
  @JSONSchema({
    title: 'Minimum Length',
    description: 'Minimum allowed length.',
    type: 'integer',
    minimum: 0,
  })
  minLength?: number;
}
