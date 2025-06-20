package com.hoster.contracts.dtos



data class AttachmentDto(
    val filename: String,
    val content: String,
    val contentType: String? = null
)
