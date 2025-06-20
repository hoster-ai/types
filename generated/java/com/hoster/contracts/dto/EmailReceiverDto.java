// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * EmailReceiverDto Data Transfer Object
 */
@Data
public class EmailReceiverDto {

    /**
     * The main email address / 
     */
    @JsonProperty("to")
    private String to;

    /**
     * List of email addresses for carbon copy (optional) Must be valid and unique email addresses / 
     */
    @JsonProperty("cc")
    private java.util.List<String> cc;

    /**
     * List of email addresses for blind carbon copy (optional) Must be valid and unique email addresses / 
     */
    @JsonProperty("bcc")
    private java.util.List<String> bcc;

}
