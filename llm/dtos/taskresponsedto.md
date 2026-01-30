# TaskResponseDto

**Description:** DTO for task response. Used to return the ID of a created task.

**Source:** `dtos/task-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsString } from 'class-validator';

/**
 * DTO for task response.
 * Used to return the ID of a created task.
 */
export class TaskResponseDto {
  /**
   * The ID of the task that was created
   */
  @IsString()
  taskId!: string;
}
```

