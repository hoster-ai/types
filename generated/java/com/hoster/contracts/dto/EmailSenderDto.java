// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * EmailSenderDto Data Transfer Object
 */
@Data
public class EmailSenderDto {

    /**
     * The full name of the sender / 
     */
    @JsonProperty("fullName")
    private String fullName;

    /**
     * The email subject Length restriction from 1 to 500 characters / 
     */
    @JsonProperty("subject")
    private String subject;

    /**
     * The message content Length restriction from 1 to 50000 characters / 
     */
    @JsonProperty("message")
    private String message;

    /**
     * File attachments (optional) / 
     */
    @JsonProperty("attachments")
    private java.util.List<AttachmentDto> attachments;

}
