import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

/**
 * Base response class
 * Used as a foundation for all API responses
 */
export class BaseResponse {
  /**
   * Response code
   */
  @IsNumber()
  @IsNotEmpty()
  code: number;

  /**
   * Response message
   * @minLength 1
   */
  @IsString()
  @IsNotEmpty()
  message: string;
}
