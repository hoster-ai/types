// Auto-generated from TypeScript
package com.hoster.contracts.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * MessageTypeEnum enumeration
 */
public enum MessageTypeEnum {
    EMAIL("email"),
    SMS("sms"),
    PUSH("push");

    private final String value;

    private MessageTypeEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
