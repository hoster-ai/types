# JwtDto

**Description:** DTO for the JWT itself. This is the main DTO used for user authentication and authorization.

**Source:** `dtos/jwt.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsEnum,
  ValidateNested,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RolesEnum } from '../enums/roles.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for the JWT payload.
 * This defines the structure of the data contained within the JWT.
 */
class JwtPayloadDto {
  /**
   * The unique identifier for the integration.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Integration ID',
    description: 'The unique identifier for the integration.',
    type: 'string',
  })
  integrationId!: string;

  /**
   * The unique identifier for the user who triggered the API call.
   * This is optional and may not be present in all requests (e.g., /send).
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'User ID',
    description: 'The unique identifier for the user who triggered the API call.',
    type: 'string',
  })
  userId?: string;

  /**
   * The unique identifier for the company.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Company ID',
    description: 'The unique identifier for the company.',
    type: 'string',
  })
  companyId!: string;

  /**
   * The roles that have been accepted by the company for this integration.
   */
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @JSONSchema({
    title: 'Accepted Roles',
    description: 'The roles accepted by the company for this integration.',
    type: 'array',
    items: { type: 'string', enum: Object.values(RolesEnum) },
  })
  acceptedRoles!: RolesEnum[];
}

/**
 * DTO for the JWT itself.
 * This is the main DTO used for user authentication and authorization.
 */
export class JwtDto {
  /**
   * The JWT payload containing user and company information.
   */
  @ValidateNested()
  @Type(() => JwtPayloadDto)
  @IsDefined()
  @JSONSchema({
    title: 'JWT',
    description: 'The JWT payload containing user and company information.',
    $ref: '#/components/schemas/JwtPayloadDto',
  })
  jwt!: JwtPayloadDto;
}
```

