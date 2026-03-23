import { IsString, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Sender Phone',
    description: "Sender's phone number.",
    type: 'string',
  })
  senderPhone!: string;

  /**
   * The content of the SMS message
   */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Message',
    description: 'The content of the SMS message.',
    type: 'string',
  })
  message!: string;
}
