# validateAdminPanelTabsDto

**Description:** Validates an AdminPanelTabsDto object using class-validator decorators.

**Source:** `validators/admin-panel-tabs.validator.ts`

**Language:** typescript

## Code

```typescript
import { ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdminPanelTabsDto } from '../dtos/admin-panel.dto';
import { validateSync } from 'class-validator';

export function validateAdminPanelTabsDto(data: object): ValidationError[] {
  const dto = plainToInstance(AdminPanelTabsDto, data);
  const errors = validateSync(dto);
  return errors;
}
```
