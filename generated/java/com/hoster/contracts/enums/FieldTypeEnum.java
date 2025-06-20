// Auto-generated from TypeScript
package com.hoster.contracts.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * FieldTypeEnum enumeration
 */
public enum FieldTypeEnum {
    TEXT_BOX("TEXT_BOX"),
    TEXT_AREA("TEXT_AREA"),
    SELECT("SELECT"),
    MULTI_SELECT("MULTI_SELECT"),
    DESCRIPTION("DESCRIPTION"),
    RADIO_BOX("RADIO_BOX"),
    CHECKBOX("CHECKBOX"),
    SLIDER("SLIDER");

    private final String value;

    private FieldTypeEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
