# validateProxyActionTaskDto

**Description:** Validates the body of an ACTION Cloud Task, as the proxy worker receives it.

**Source:** `validators/proxy-action-task-validator.ts`

**Language:** typescript

## Code

```typescript
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProxyActionTaskDto } from '../dtos/proxy-action-task.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates the body of an ACTION Cloud Task, as the proxy worker receives it.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProxyActionTaskDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const task = plainToInstance(ProxyActionTaskDto, plainObject);
  return await validate(task, STRICT_VALIDATION_OPTIONS);
};
```
