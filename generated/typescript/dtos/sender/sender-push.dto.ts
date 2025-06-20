import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

/**
 * DTO for push notification sender
 * Used to define the details for sending a push notification
 */
export class PushSenderDto {
  /**
   * Unique identifier of the message
   * Length restriction from 1 to 255 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  messageId: string;

  /**
   * The user ID that will receive the push notification
   * Length restriction from 1 to 255 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  userId: string;

  /**
   * The title of the push notification
   * Length restriction from 1 to 255 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  title: string;

  /**
   * The content of the push notification
   * Length restriction from 1 to 1000 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  message: string;

  /**
   * The subtitle of the push notification (optional)
   * Length restriction from 1 to 255 characters
   */
  @IsOptional()
  @IsString()
  @Length(1, 255)
  subtitle?: string;
}
