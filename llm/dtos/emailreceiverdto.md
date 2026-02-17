# EmailReceiverDto

**Description:** DTO for email recipients Used to define the recipients of an email

**Source:** `dtos/notification/receiver/receiver-email.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  ArrayUnique,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'To',
    description: 'The main email address.',
    type: 'string',
    format: 'email',
  })
  to!: string;

  /**
   * List of email addresses for carbon copy (optional)
   * Must be valid and unique email addresses
   */
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayUnique()
  @JSONSchema({
    title: 'CC',
    description: 'List of email addresses for carbon copy.',
    type: 'array',
    items: { type: 'string', format: 'email' },
  })
  cc?: string[];

  /**
   * List of email addresses for blind carbon copy (optional)
   * Must be valid and unique email addresses
   */
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  @ArrayUnique()
  @JSONSchema({
    title: 'BCC',
    description: 'List of email addresses for blind carbon copy.',
    type: 'array',
    items: { type: 'string', format: 'email' },
  })
  bcc?: string[];
}
```

