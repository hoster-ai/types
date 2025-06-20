// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * ActionDto Data Transfer Object
 */
@Data
public class ActionDto {

    /**
     * The icon of the action. / 
     */
    @JsonProperty("icon")
    private String icon;

    /**
     * The label of the action (optional). / 
     */
    @JsonProperty("label")
    private String label;

    @JsonProperty("openMethod")
    private OpenMethodEnum openMethod;

    /**
     * The link of the action. / 
     */
    @JsonProperty("url")
    private String url;

}
