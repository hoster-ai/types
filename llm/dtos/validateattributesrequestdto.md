# ValidateAttributesRequestDto

**Description:** Represents a request to validate product attributes. This DTO is used when a client needs to check the validity of a set of attribute values before proceeding with an action, such as creating or updating a product.

**Source:** `dtos/requests/validate-attributes-request.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsDefined, IsObject, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Represents a request to validate attributes.
 * This DTO is used when a client needs to check the validity of a set of attribute values
 * before proceeding with an action, such as creating or updating a product.
 */
export class ValidateAttributesRequestDto {
  /**
   * The key of the attribute that triggered the validation.
   * This helps the server understand the context of the validation request,
   * especially in cases where validation rules are interdependent.
   */
  @IsDefined()
  @IsString()
  @JSONSchema({
    title: 'Triggered By Key',
    description: 'The key of the attribute that triggered the validation.',
    type: 'string',
  })
  triggeredByKey!: string;

  /**
   * A record of attribute values to be validated.
   * The keys are the attribute identifiers, and the values are the data to be checked.
   */
  @IsDefined()
  @IsObject()
  @JSONSchema({
    title: 'Attribute Values',
    description: 'A record of attribute values to be validated.',
    type: 'object',
    additionalProperties: true,
  })
  attributeValues!: Record<string, unknown>;
}
```

