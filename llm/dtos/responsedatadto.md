# ResponseDataDto

**Description:** DTO for response data. Used to return a generic data object in API responses.

**Source:** `dtos/response-data.dto.ts`

**Language:** typescript

## Code

```typescript
/**
 * DTO for response data.
 * Used to return a generic data object in API responses.
 */
export class ResponseDataDto {
  /**
   * A record of key-value pairs representing the response data.
   */
  data!: Record<string, unknown>;
}
```

