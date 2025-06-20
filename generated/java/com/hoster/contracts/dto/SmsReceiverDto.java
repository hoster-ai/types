// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * SmsReceiverDto Data Transfer Object
 */
@Data
public class SmsReceiverDto {

    /**
     * List of recipient phone numbers Must be valid phone numbers / 
     */
    @JsonProperty("receiverPhones")
    private java.util.List<String> receiverPhones;

}
