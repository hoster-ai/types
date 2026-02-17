import { IsArray, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for error response.
 * Used to return detailed error information to the client.
 */
export class ErrorResponseDto {
  /**
   * A unique and specific error code for programmatic error handling.
   * @example 400
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Code',
    description: 'A unique and specific error code for programmatic error handling.',
    type: 'number',
    example: 400,
  })
  code!: number;

  /**
   * A developer-friendly error message or an array of messages.
   * This can be a single string for a general error, or an array for multiple validation errors.
   * @example "Validation failed"
   * @example ["email must be an email", "password must be at least 8 characters"]
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @JSONSchema({
    title: 'Errors',
    description: 'A developer-friendly error message or an array of messages.',
    oneOf: [
      { type: 'string' },
      { type: 'array', items: { type: 'string' } },
    ],
  })
  errors?: string[] | string;
}
