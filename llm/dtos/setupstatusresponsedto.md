# SetupStatusResponseDto

**Description:** DTO for setup status response. Extends the base response to include the setup status.

**Source:** `dtos/setup-status-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { SetupStatusEnum } from '../enums/setup-status.enum';
import { BaseResponse } from './base-response.dto';

/**
 * DTO for setup status response.
 * Extends the base response to include the setup status.
 */
export class SetupStatusResponseDto extends BaseResponse {
  /**
   * The status of the setup process.
   * @see SetupStatusEnum
   */
  status!: SetupStatusEnum;
}
```

