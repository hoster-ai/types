// Auto-generated from TypeScript
package com.hoster.contracts.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * SetupStatusEnum enumeration
 */
public enum SetupStatusEnum {
    SUCCESS("success"),
    FAILURE("failure"),
    PENDING("pending");

    private final String value;

    private SetupStatusEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
