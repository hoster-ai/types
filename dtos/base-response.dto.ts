import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Code',
    description: 'Response code.',
    type: 'number',
  })
  code!: number;

  /**
   * Response message
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Message',
    description: 'Response message.',
    type: 'string',
  })
  message!: string;
}
