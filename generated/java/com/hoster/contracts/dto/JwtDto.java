// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * JwtDto Data Transfer Object
 */
@Data
public class JwtDto {

    /**
     * Integration identifier / 
     */
    @JsonProperty("integrationId")
    private String integrationId;

    /**
     * Unique user identifier that triggers the API call (only the /send method will not contain userId). / 
     */
    @JsonProperty("userId")
    private String userId;

    /**
     * Unique company identifier / 
     */
    @JsonProperty("companyId")
    private String companyId;

    /**
     * The roles accepted by the company for this integration / 
     */
    @JsonProperty("acceptedRoles")
    private java.util.List<RolesEnum> acceptedRoles;

}
