# validateAttachmentDto

**Description:** Validates an AttachmentDto object using class-validator decorators.

**Source:** `validators/attachment-validator.ts`

**Language:** typescript

## Code

```typescript
import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AttachmentDto } from '../dtos/attachment.dto';

/**
 * Validates an AttachmentDto object using class-validator decorators.
 *
 * @param data The object to validate as an AttachmentDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateAttachmentDto(data: object): ValidationError[] {
  const dto = plainToInstance(AttachmentDto, data);
  const errors = validateSync(dto);

  return errors;
}
```
