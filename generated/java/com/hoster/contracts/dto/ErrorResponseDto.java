// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * ErrorResponseDto Data Transfer Object
 */
@Data
public class ErrorResponseDto {

    /**
     * Unique error identifier Used for error reporting and tracking / 
     */
    @JsonProperty("code")
    private String code;

    /**
     * Array or text with error messages May contain one or more messages describing the error / 
     */
    @JsonProperty("errors")
    private Object errors;

}
