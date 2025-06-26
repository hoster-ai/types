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

class JwtPayloadDto {
  /**
   * Integration identifier
   */
  @IsString()
  @IsNotEmpty()
  integrationId!: string;

  /**
   * Unique user identifier that triggers the API call (only the /send method will not contain userId).
   */
  @IsString()
  @IsOptional()
  userId?: string;

  /**
   * Unique company identifier
   */
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  /**
   * The roles accepted by the company for this integration
   */
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  acceptedRoles!: RolesEnum[];
}

/**
 * DTO for JWT payload
 * Used for user authentication and authorization
 */
export class JwtDto {
  /**
   * User information contained in the JWT token
   * Includes user and company identifiers, admin rights
   * and optional sender details
   */
  @ValidateNested()
  @Type(() => JwtPayloadDto)
  @IsDefined()
  jwt!: JwtPayloadDto;
}
