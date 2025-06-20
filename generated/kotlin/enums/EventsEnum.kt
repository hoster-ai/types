package com.hoster.contracts.enums

enum class EventsEnum(val value: String) {
    TEST("test"),
    DEAD_LETTER("dead-lettering"),
    CORE_QUEUE("core-queue");
}
