import { RolesEnum } from '../enums/roles.enum';

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
  jwt: {

    /**
     * Integration identifier
     */
    integrationId: string;
    
    /**
     * Unique user identifier that triggers the API call (only the /send method will not contain userId).
     */
    userId?: string;

    /**
     * Unique company identifier
     */
    companyId: string;

    /**
     * The roles accepted by the company for this integration
     */
    acceptedRoles: RolesEnum[];
  };
}
