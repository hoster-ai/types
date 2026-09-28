# ErrorResponseDto

**Description:** DTO for error response. Used to return detailed error information to the client.

**Source:** `dtos/error-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsInt, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { IsStringOrStringArray } from '../decorators/is-string-or-string-array.validator';

/**
 * DTO for error response.
 * Used to return detailed error information to the client.
 */
export class ErrorResponseDto {
  /**
   * A unique and specific error code for programmatic error handling.
   * @example 400
   */
  @IsInt()
  @JSONSchema({
    title: 'Code',
    description:
      'A unique and specific error code for programmatic error handling.',
    type: 'integer',
    example: 400,
  })
  code!: number;

  /**
   * A developer-friendly error message or an array of messages.
   * This can be a single string for a general error, or an array for multiple validation errors.
   * @example "Validation failed"
   * @example ["email must be an email", "password must be at least 8 characters"]
   */
  @IsOptional()
  @IsStringOrStringArray()
  @JSONSchema({
    title: 'Errors',
    description: 'A developer-friendly error message or an array of messages.',
    oneOf: [{ type: 'string' }, { type: 'array', items: { type: 'string' } }],
  })
  errors?: string[] | string;
}
```
