package com.hoster.contracts.dtos.receiver

import java.util.List;

data class EmailReceiverDto(
    val to: String,
    val each: true }),
    val cc: List<String>? = null,
    val each: true }),
    val bcc: List<String>? = null
)
