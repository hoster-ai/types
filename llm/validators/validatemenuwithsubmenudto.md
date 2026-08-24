# validateMenuWithSubmenuDto

**Description:** Validates a MenuWithSubmenuDto object using class-validator decorators.

**Source:** `validators/menu-with-submenu.validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { MenuDtoWithSubmenu } from '../dtos/menu.dto';
import { ValidationError } from 'class-validator';

export function validateMenuWithSubmenuDto(data: object): ValidationError[] {
  const dto = plainToInstance(MenuDtoWithSubmenu, data);
  const errors = validateSync(dto);
  return errors;
}
```
