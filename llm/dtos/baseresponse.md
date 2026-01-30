# BaseResponse

**Description:** Base response class Used as a foundation for all API responses

**Source:** `dtos/base-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

/**
 * Base response class
 * Used as a foundation for all API responses
 */
export class BaseResponse {
  /**
   * Response code
   */
  @IsNumber()
  @IsNotEmpty()
  code!: number;

  /**
   * Response message
   */
  @IsString()
  @IsNotEmpty()
  message!: string;
}
```

