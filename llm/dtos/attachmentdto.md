# AttachmentDto

**Description:** DTO for file attachments Used for sending attached files with emails

**Source:** `dtos/attachment.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsString, IsOptional, IsBase64, IsNotEmpty } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Filename',
    description: 'The name of the attached file.',
    type: 'string',
  })
  filename!: string;

  /**
   * The content of the file in Base64 encoding
   */
  @IsNotEmpty()
  @IsString()
  @IsBase64()
  @JSONSchema({
    title: 'Content',
    description: 'The content of the file in Base64 encoding.',
    type: 'string',
    format: 'byte',
  })
  content!: string;

  /**
   * The content type of the file (MIME type)
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Content Type',
    description: 'The content type of the file (MIME type).',
    type: 'string',
  })
  contentType?: string;
}
```

