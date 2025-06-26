import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

/**
 * DTO for email recipients
 * Used to define the recipients of an email
 */
export class EmailReceiverDto {
  /**
   * The main email address
   */
  @IsNotEmpty()
  @IsEmail()
  to!: string;

  /**
   * List of email addresses for carbon copy (optional)
   * Must be valid and unique email addresses
   */
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayUnique()
  cc?: string[];

  /**
   * List of email addresses for blind carbon copy (optional)
   * Must be valid and unique email addresses
   */
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayUnique()
  bcc?: string[];
}
