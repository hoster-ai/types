package com.hoster.contracts.dtos.info

import java.util.List;
import java.util.Map;

data class InfoDto(
    val label: String,
    val url: String,
    val icon: String,
    val label: String,
    val each: true }),
    val tabs: List<TabDto>,
    val title: String,
    val logo: String? = null,
    val description: String? = null,
    val each: true }),
    val supported_languages: List<LanguageEnum>,
    val product_attributes: List<FieldDto>? = null,
    val item_attributes: List<FieldDto>? = null,
    val listen_events: List<EventsEnum>? = null,
    val each: true }),
    val requiredRoles: List<RolesEnum>? = null,
    val unsupportedActions: List<ActionsEnum> = [],
    val adminPanel: {? = null,
    val productTabs: List<TabDto>? = null,
    val actions: {? = null,
    val client: List<ActionDto>? = null,
    val item: List<ActionDto>? = null,
    val menu: MenuDto? = null,
    val settings: MenuDto? = null,
    val clientPanel: {? = null,
    val productTabs: List<TabDto>? = null,
    val actions: {? = null,
    val item: List<ActionDto>? = null,
    val menu: MenuDto? = null,
    val onboardingUrl: String? = null,
    val payPerUseUnits: List<UnitDto>? = null,
    val responseDataFieldNames: Map<keyof ResponseDataDto, String>? = null
)
