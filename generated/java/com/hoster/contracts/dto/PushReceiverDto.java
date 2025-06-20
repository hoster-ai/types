// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * PushReceiverDto Data Transfer Object
 */
@Data
public class PushReceiverDto {

    /**
     * The user ID that will receive the push notification / 
     */
    @JsonProperty("userId")
    private String userId;

    /**
     * List of user device tokens Must contain at least one token / 
     */
    @JsonProperty("deviceTokens")
    private java.util.List<String> deviceTokens;

}
