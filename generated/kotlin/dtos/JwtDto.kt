package com.hoster.contracts.dtos

import java.util.List;

data class JwtDto(
    val jwt: {,
    val integrationId: String,
    val userId: String? = null,
    val companyId: String,
    val acceptedRoles: List<RolesEnum>
)
