// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * RequestDto Data Transfer Object
 */
@Data
public class RequestDto {

    /**
     * Unique identifier of the hoster message / 
     */
    @JsonProperty("notificationId")
    private String notificationId;

    /**
     * Sender details according to the integration's notification type / 
     */
    @JsonProperty("sender")
    private Object sender;

    /**
     * Recipient details according to the integration's notification type / 
     */
    @JsonProperty("receiver")
    private Object receiver;

}
