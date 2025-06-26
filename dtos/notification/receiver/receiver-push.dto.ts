import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
} from 'class-validator';

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
  userId!: string;

  /**
   * List of user device tokens
   * Must contain at least one token
   */
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  deviceTokens!: string[];
}
