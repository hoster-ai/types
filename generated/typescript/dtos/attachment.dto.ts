import { IsString, IsOptional, IsBase64, IsNotEmpty } from 'class-validator';

/**
 * DTO for file attachments
 * Used for sending attached files with emails
 */
export class AttachmentDto {
  /**
   * The name of the attached file
   */
  @IsNotEmpty()
  @IsString()
  filename: string;

  /**
   * The content of the file in Base64 encoding
   */
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  content: string;

  /**
   * The content type of the file (MIME type)
   */
  @IsOptional()
  @IsString()
  contentType?: string;
}
