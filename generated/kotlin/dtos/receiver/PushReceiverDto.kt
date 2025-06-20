package com.hoster.contracts.dtos.receiver

import java.util.List;

data class PushReceiverDto(
    val userId: String,
    val deviceTokens: List<String>
)
