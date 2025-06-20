// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * FieldDto Data Transfer Object
 */
@Data
public class FieldDto {

    /**
     * ID of action field / 
     */
    @JsonProperty("id")
    private String id;

    /**
     * Label of action field / 
     */
    @JsonProperty("label")
    private java.util.List<MultilangTextDto> label;

    /**
     * Value of action field / 
     */
    @JsonProperty("value")
    private Object value;

    /**
     * Type of label / 
     */
    @JsonProperty("type")
    private FieldTypeEnum type;

    /**
     * Indicates if the field is required / 
     */
    @JsonProperty("required")
    private Boolean required;

    /**
     * Indicates if the field is disabled / 
     */
    @JsonProperty("disabled")
    private Boolean disabled;

    /**
     * Indicates if the field is hidden / 
     */
    @JsonProperty("hidden")
    private Boolean hidden;

    /**
     * Regex validation pattern for the field / 
     */
    @JsonProperty("regexValidation")
    private String regexValidation;

    /**
     * Error message for the field for supported languages / 
     */
    @JsonProperty("regexValidationErrorMessage")
    private java.util.List<MultilangTextDto> regexValidationErrorMessage;

    /**
     * Indicates if the field has remote validation / 
     */
    @JsonProperty("remoteValidation")
    private Boolean remoteValidation;

    /**
     * Error message for the field / 
     */
    @JsonProperty("remoteValidationErrorMessage")
    private java.util.List<MultilangTextDto> remoteValidationErrorMessage;

}
