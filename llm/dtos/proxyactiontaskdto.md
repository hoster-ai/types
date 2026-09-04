# ProxyActionTaskDto

**Description:** The body of an ACTION Cloud Task. The task targets the PROXY WORKER, not the integration: the proxy makes the onward call, answers the task, and reports what the integration said on `hookUrl`. Everything the proxy needs travels here — it holds no state and reads no database.

**Source:** `dtos/proxy-action-task.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsString,
  IsUrl,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * The body of an ACTION Cloud Task. The task targets the PROXY WORKER, not the integration:
 * the proxy makes the onward call, answers the task, and reports what the integration said on
 * `hookUrl`. Everything the proxy needs travels here — it holds no state and reads no database.
 */
export class ProxyActionTaskDto {
  /**
   * Correlation anchor: the core's outbox row id, echoed back on the hook as `outboxId`.
   */
  @IsMongoId()
  @JSONSchema({
    title: 'Outbox Id',
    description: "The core's outbox row this task delivers.",
  })
  outboxId!: string;

  /**
   * Absolute target of the onward call, action route included (`${integration.url}/${action}`).
   */
  @IsUrl({ require_tld: false })
  @JSONSchema({
    title: 'Integration URL',
    description: 'Absolute URL the proxy calls, action included.',
  })
  integrationUrl!: string;

  /**
   * Bearer the proxy presents to the INTEGRATION. Frozen in the task, so it must outlive the
   * queue's whole retry window.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Integration Token',
    description: 'Bearer for the onward call to the integration.',
  })
  integrationToken!: string;

  /**
   * Where the proxy reports what the integration answered. The integration's own deferred
   * report needs no url: its hooks are public, well-known routes per action.
   */
  @IsUrl({ require_tld: false })
  @JSONSchema({
    title: 'Hook URL',
    description: "The core's proxy hook for this action.",
  })
  hookUrl!: string;

  /**
   * Pub/Sub topic the proxy publishes to when the task exhausts its retries.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Dead Letter Queue',
    description: 'Topic for a task that exhausted its retries.',
  })
  deadLetterQueue!: string;

  /**
   * The integration REQUEST DTO, verbatim — the proxy forwards it untouched.
   */
  @IsObject()
  @JSONSchema({
    title: 'Payload',
    description: 'The integration request, forwarded untouched.',
  })
  payload!: Record<string, unknown>;
}
```
