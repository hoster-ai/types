// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * PushSenderDto Data Transfer Object
 */
@Data
public class PushSenderDto {

    /**
     * Unique identifier of the message Length restriction from 1 to 255 characters / 
     */
    @JsonProperty("messageId")
    private String messageId;

    /**
     * The user ID that will receive the push notification Length restriction from 1 to 255 characters / 
     */
    @JsonProperty("userId")
    private String userId;

    /**
     * The title of the push notification Length restriction from 1 to 255 characters / 
     */
    @JsonProperty("title")
    private String title;

    /**
     * The content of the push notification Length restriction from 1 to 1000 characters / 
     */
    @JsonProperty("message")
    private String message;

    /**
     * The subtitle of the push notification (optional) Length restriction from 1 to 255 characters / 
     */
    @JsonProperty("subtitle")
    private String subtitle;

}
