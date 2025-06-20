package com.hoster.contracts.enums

enum class ActionsEnum(val value: String) {
    CREATE("CREATE"),
    RENEW("RENEW"),
    UPGRADE("UPGRADE"),
    DOWNGRADE("DOWNGRADE"),
    SUSPEND("SUSPEND"),
    UNSUSPEND("UNSUSPEND"),
    DELETE("DELETE");
}
