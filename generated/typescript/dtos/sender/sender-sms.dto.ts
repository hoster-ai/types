import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';

/**
 * DTO for SMS sender
 * Used to define the details for sending an SMS message
 */
export class SmsSenderDto {
  /**
   * Sender's phone number
   * Must be a valid phone number
   */
  @IsNotEmpty()
  @IsPhoneNumber()
  senderPhone: string;

  /**
   * The content of the SMS message
   */
  @IsNotEmpty()
  @IsString()
  message: string;
}
