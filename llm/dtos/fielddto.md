# FieldDto

**Description:** @deprecated Type alias for AnyFieldDto (the discriminated union of concrete field DTOs). Kept for one release for backward compatibility while downstream consumers migrate (hoster-ai/api issue #449).

**Source:** `dtos/field.dto.ts`

**Language:** typescript

## Code

```typescript
import { AnyFieldDto } from './fields/any-field.dto';

/**
 * @deprecated Use a concrete field DTO (`TextFieldDto`, `NumberFieldDto`, ...)
 * or the `AnyFieldDto` union directly. This alias is kept for one release while
 * downstream consumers migrate (hoster-ai/api issue #449).
 */
export type FieldDto = AnyFieldDto;
```
