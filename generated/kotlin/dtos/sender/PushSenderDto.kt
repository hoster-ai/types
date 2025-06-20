package com.hoster.contracts.dtos.sender



data class PushSenderDto(
    val messageId: String,
    val userId: String,
    val title: String,
    val message: String,
    val subtitle: String? = null
)
