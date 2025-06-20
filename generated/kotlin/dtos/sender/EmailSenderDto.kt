package com.hoster.contracts.dtos.sender

import java.util.List;

data class EmailSenderDto(
    val fullName: String,
    val subject: String,
    val message: String,
    val each: true }),
    val attachments: List<AttachmentDto>? = null
)
