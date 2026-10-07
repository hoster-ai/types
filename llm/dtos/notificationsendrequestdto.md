# NotificationSendRequestDto

**Description:** Request payload for sending a notification. Sent from hoster.ai to notification integrations (email, push, SMS).

**Source:** `dtos/notification/requests/notification-send-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateBy,
  ValidateNested,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { EmailSenderDto } from '../sender/sender-email.dto';
import { PushSenderDto } from '../sender/sender-push.dto';
import { SmsSenderDto } from '../sender/sender-sms.dto';
import { EmailReceiverDto } from '../receiver/receiver-email.dto';
import { PushReceiverDto } from '../receiver/receiver-push.dto';
import { SmsReceiverDto } from '../receiver/receiver-sms.dto';

type SubTypes = { value: new () => object; name: string }[];

const SENDER_TYPES: SubTypes = [
  { value: EmailSenderDto, name: 'email' },
  { value: PushSenderDto, name: 'push' },
  { value: SmsSenderDto, name: 'sms' },
];
const RECEIVER_TYPES: SubTypes = [
  { value: EmailReceiverDto, name: 'email' },
  { value: PushReceiverDto, name: 'push' },
  { value: SmsReceiverDto, name: 'sms' },
];

/**
 * The `__type` discriminator picks the subclass in class-transformer. Without
 * it the value stays a plain object and no nested rule runs, so reject it.
 */
const HasKnownType = (types: SubTypes) =>
  ValidateBy({
    name: 'hasKnownType',
    validator: {
      validate: (value) => types.some((t) => value instanceof t.value),
      defaultMessage: (args) =>
        `${args?.property}.__type must be one of: ${types.map((t) => t.name).join(', ')}`,
    },
  });

/** Wire schema of a `__type`-discriminated property: each branch requires its literal. */
const discriminatedOneOf = (types: SubTypes) =>
  types.map((t) => ({
    allOf: [
      { $ref: `#/components/schemas/${t.value.name}` },
      {
        type: 'object' as const,
        required: ['__type'],
        properties: { __type: { type: 'string' as const, enum: [t.name] } },
      },
    ],
  }));

/**
 * Request payload for sending a notification.
 * Sent from hoster.ai to notification integrations (email, push, SMS).
 */
export class NotificationSendRequestDto {
  /** Unique identifier for the notification */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Notification ID',
    description: 'Unique identifier for the notification.',
    type: 'string',
  })
  notificationId!: string;

  /** Sender details (type depends on integration: email, push, or SMS) */
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @HasKnownType(SENDER_TYPES)
  @Type(() => Object, {
    discriminator: { property: '__type', subTypes: SENDER_TYPES },
    keepDiscriminatorProperty: false,
  })
  @JSONSchema({
    title: 'Sender',
    description:
      'Sender details (type depends on integration: email, push, or SMS). `__type` picks the variant.',
    oneOf: discriminatedOneOf(SENDER_TYPES),
  })
  sender!: EmailSenderDto | PushSenderDto | SmsSenderDto;

  /** Recipient details (type depends on integration: email, push, or SMS) */
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @HasKnownType(RECEIVER_TYPES)
  @Type(() => Object, {
    discriminator: { property: '__type', subTypes: RECEIVER_TYPES },
    keepDiscriminatorProperty: false,
  })
  @JSONSchema({
    title: 'Receiver',
    description:
      'Recipient details (type depends on integration: email, push, or SMS). `__type` picks the variant.',
    oneOf: discriminatedOneOf(RECEIVER_TYPES),
  })
  receiver!: EmailReceiverDto | PushReceiverDto | SmsReceiverDto;
}
```
