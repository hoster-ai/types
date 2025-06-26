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
  integrationId!: string;

  /**
   * The unique identifier for the user who triggered the API call.
   * This is optional and may not be present in all requests (e.g., /send).
   */
  @IsString()
  @IsOptional()
  userId?: string;

  /**
   * The unique identifier for the company.
   */
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  /**
   * The roles that have been accepted by the company for this integration.
   */
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
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
  jwt!: JwtPayloadDto;
}
