package com.hoster.contracts.dtos

import java.util.List;

data class CompanyDataDto(
    val id: String,
    val name: String,
    val emails: List<String>,
    val invoiceEmail: String,
    val privacyPolicyUrl: String,
    val defaultLanguage: LanguageEnum,
    val languages: List<LanguageEnum>,
    val telephone: String,
    val mobile: String? = null,
    val address1: String,
    val address2: String? = null,
    val address3: String? = null,
    val postcode: String,
    val city: String,
    val country: CountryEnum,
    val state: String? = null,
    val vat: String? = null,
    val taxOffice: String? = null
)
