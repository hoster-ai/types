package com.hoster.contracts.dtos



data class RequestDto(
    val notificationId: String,
    val sender: Any,
    val receiver: Any
)
