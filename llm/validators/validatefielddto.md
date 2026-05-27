# validateFieldDto

**Description:** @deprecated Delegates to validateAnyFieldDto. Use the dispatcher (or a concrete per-type validator) instead.

**Source:** `validators/field-validator.ts`

**Language:** typescript

## Code

```typescript
import { ValidationError } from 'class-validator';
import { validateAnyFieldDto } from './any-field-validator';

/**
 * @deprecated Use `validateAnyFieldDto` (or a concrete per-type validator like
 * `validateTextFieldDto`) instead. Kept for one release for backward compatibility.
 */
export function validateFieldDto(data: object): ValidationError[] {
  return validateAnyFieldDto(data);
}
```
