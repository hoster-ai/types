// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * BaseResponse Data Transfer Object
 */
@Data
public class BaseResponse {

    /**
     * Response code / 
     */
    @JsonProperty("code")
    private Double code;

    /**
     * Response message / 
     */
    @JsonProperty("message")
    private String message;

}
