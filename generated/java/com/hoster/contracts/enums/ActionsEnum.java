// Auto-generated from TypeScript
package com.hoster.contracts.enums;

import com.fasterxml.jackson.annotation.JsonValue;

/**
 * ActionsEnum enumeration
 */
public enum ActionsEnum {
    CREATE("CREATE"),
    RENEW("RENEW"),
    UPGRADE("UPGRADE"),
    DOWNGRADE("DOWNGRADE"),
    SUSPEND("SUSPEND"),
    UNSUSPEND("UNSUSPEND"),
    DELETE("DELETE");

    private final String value;

    private ActionsEnum(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }
}
