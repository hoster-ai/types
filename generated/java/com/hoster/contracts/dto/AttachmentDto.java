// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * AttachmentDto Data Transfer Object
 */
@Data
public class AttachmentDto {

    /**
     * The name of the attached file / 
     */
    @JsonProperty("filename")
    private String filename;

    /**
     * The content of the file in Base64 encoding / 
     */
    @JsonProperty("content")
    private String content;

    /**
     * The content type of the file (MIME type) / 
     */
    @JsonProperty("contentType")
    private String contentType;

}
