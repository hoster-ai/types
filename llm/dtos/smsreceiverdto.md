# SmsReceiverDto

**Description:** DTO for SMS recipients Used to define the recipients of an SMS message

**Source:** `dtos/notification/receiver/receiver-sms.dto.ts`

**Language:** typescript

## Code

```typescript
import { ArrayUnique, IsArray, IsPhoneNumber } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for SMS recipients
 * Used to define the recipients of an SMS message
 */
export class SmsReceiverDto {
  /**
   * List of recipient phone numbers
   * Must be valid phone numbers
   */
  @IsArray()
  @ArrayUnique()
  @IsPhoneNumber(undefined, { each: true })
  @JSONSchema({
    title: 'Receiver Phones',
    description: 'List of recipient phone numbers.',
    type: 'array',
    items: { type: 'string' },
  })
  receiverPhones!: string[];
}
```

