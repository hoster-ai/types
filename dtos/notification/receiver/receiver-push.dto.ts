import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for push notification recipients
 * Used to define the recipients of a push notification
 */
export class PushReceiverDto {
  /**
   * The user ID that will receive the push notification
   */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'User ID',
    description: 'The user ID that will receive the push notification.',
    type: 'string',
  })
  userId!: string;

  /**
   * List of user device tokens
   * Must contain at least one token
   */
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Device Tokens',
    description: 'List of user device tokens.',
    type: 'array',
    items: { type: 'string' },
    minItems: 1,
  })
  deviceTokens!: string[];
}
