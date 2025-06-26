import { IsArray, IsOptional, IsString, IsNotEmpty } from 'class-validator';

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
  errors?: string[] | string;
}
