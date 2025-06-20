package com.hoster.contracts.dtos

import java.util.List;

data class FieldDto(
    val id: String,
    val label: List<MultilangTextDto>,
    val value: Any,
    val type: FieldTypeEnum,
    val required: Boolean,
    val disabled: Boolean,
    val hidden: Boolean,
    val regexValidation: String? = null,
    val regexValidationErrorMessage: List<MultilangTextDto>? = null,
    val remoteValidation: Boolean? = null,
    val remoteValidationErrorMessage: List<MultilangTextDto>? = null
)
