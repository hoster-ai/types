import { IsArray, IsOptional, IsString, IsNotEmpty } from 'class-validator';

/**
 * DTO for error response
 * Used to return error information to the client
 */
export class ErrorResponseDto {
  /**
   * Unique error identifier
   * Used for error reporting and tracking
   */
  @IsString()
  @IsNotEmpty()
  code!: number;

  /**
   * Array or text with error messages
   * May contain one or more messages describing the error
   */
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  errors?: string[] | string;
}
