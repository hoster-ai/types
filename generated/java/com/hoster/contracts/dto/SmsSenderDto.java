// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * SmsSenderDto Data Transfer Object
 */
@Data
public class SmsSenderDto {

    /**
     * Sender's phone number Must be a valid phone number / 
     */
    @JsonProperty("senderPhone")
    private String senderPhone;

    /**
     * The content of the SMS message / 
     */
    @JsonProperty("message")
    private String message;

}
