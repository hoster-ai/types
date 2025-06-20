package com.hoster.contracts.dtos



data class ActionDto(
    val icon: String,
    val label: String? = null,
    val openMethod: OpenMethodEnum,
    val url: String
)
