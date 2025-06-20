// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * MultilangTextDto Data Transfer Object
 */
@Data
public class MultilangTextDto {

    @JsonProperty("language")
    private LanguageEnum language;

    @JsonProperty("text")
    private String text;

}
