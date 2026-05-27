# PushSenderDto

**Description:** DTO for push notification sender Used to define the details for sending a push notification

**Source:** `dtos/notification/sender/sender-push.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Message ID',
    description: 'Unique identifier of the message.',
    type: 'string',
    minLength: 1,
    maxLength: 255,
  })
  messageId!: string;

  /**
   * The user ID that will receive the push notification
   * Length restriction from 1 to 255 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @JSONSchema({
    title: 'User ID',
    description: 'The user ID that will receive the push notification.',
    type: 'string',
    minLength: 1,
    maxLength: 255,
  })
  userId!: string;

  /**
   * The title of the push notification
   * Length restriction from 1 to 255 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 255)
  @JSONSchema({
    title: 'Title',
    description: 'The title of the push notification.',
    type: 'string',
    minLength: 1,
    maxLength: 255,
  })
  title!: string;

  /**
   * The content of the push notification
   * Length restriction from 1 to 1000 characters
   */
  @IsNotEmpty()
  @IsString()
  @Length(1, 1000)
  @JSONSchema({
    title: 'Message',
    description: 'The content of the push notification.',
    type: 'string',
    minLength: 1,
    maxLength: 1000,
  })
  message!: string;

  /**
   * The subtitle of the push notification (optional)
   * Length restriction from 1 to 255 characters
   */
  @IsOptional()
  @IsString()
  @Length(1, 255)
  @JSONSchema({
    title: 'Subtitle',
    description: 'The subtitle of the push notification.',
    type: 'string',
    minLength: 1,
    maxLength: 255,
  })
  subtitle?: string;
}
```
