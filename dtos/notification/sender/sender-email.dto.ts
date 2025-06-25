import {
  IsString,
  IsNotEmpty,
  Length,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AttachmentDto } from '../../attachment.dto';

/**
 * DTO for email sender
 * Used to define the details for sending an email
 */
export class EmailSenderDto {
  /**
   * The full name of the sender
   */
  @IsNotEmpty()
  @IsString()
  fullName: string;

  /**
   * The email subject
   * Length restriction from 1 to 500 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  subject: string;

  /**
   * The message content
   * Length restriction from 1 to 50000 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 50000)
  message: string;

  /**
   * File attachments (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}
