# EmailSenderDto

**Description:** DTO for email sender Used to define the details for sending an email

**Source:** `dtos/notification/sender/sender-email.dto.ts`

**Language:** typescript

## Code

```typescript
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
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Full Name',
    description: 'The full name of the sender.',
    type: 'string',
  })
  fullName!: string;

  /**
   * The email subject
   * Length restriction from 1 to 500 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  @JSONSchema({
    title: 'Subject',
    description: 'The email subject.',
    type: 'string',
    minLength: 1,
    maxLength: 500,
  })
  subject!: string;

  /**
   * The message content
   * Length restriction from 1 to 50000 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 50000)
  @JSONSchema({
    title: 'Message',
    description: 'The message content.',
    type: 'string',
    minLength: 1,
    maxLength: 50000,
  })
  message!: string;

  /**
   * File attachments (optional)
   */
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  @JSONSchema({
    title: 'Attachments',
    description: 'File attachments.',
    type: 'array',
    items: { $ref: '#/components/schemas/AttachmentDto' },
  })
  attachments?: AttachmentDto[];
}
```
