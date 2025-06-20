// Auto-generated from TypeScript
package com.hoster.contracts.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * OpenMethodEnum enumeration
 */
public enum OpenMethodEnum {
    AJAX_CALL("ajax_call"),
    SMALL_IFRAME("small_iframe"),
    MEDIUM_IFRAME("medium_iframe"),
    LARGE_IFRAME("large_iframe");

    private final String value;

    private OpenMethodEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
