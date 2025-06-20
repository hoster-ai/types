// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;
import lombok.Data;

/**
 * InfoDto Data Transfer Object
 */
@Data
public class InfoDto {

    /**
     * The label displayed on the tab / 
     */
    @JsonProperty("label")
    private String label;

    /**
     * The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company / 
     */
    @JsonProperty("url")
    private String url;

    /**
     * The icon to be displayed for the menu item / 
     */
    @JsonProperty("icon")
    private String icon;

    /**
     * The name to be displayed for the menu item / 
     */
    @JsonProperty("label")
    private String label;

    /**
     * The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. / 
     */
    @JsonProperty("tabs")
    private java.util.List<TabDto> tabs;

    /**
     * The title of the integration / 
     */
    @JsonProperty("title")
    private String title;

    /**
     * The logo of the integration (optional) / 
     */
    @JsonProperty("logo")
    private String logo;

    /**
     * Description of the integration and its services (optional) / 
     */
    @JsonProperty("description")
    private String description;

    @JsonProperty("supported_languages")
    private java.util.List<LanguageEnum> supported_languages;

    @JsonProperty("product_attributes")
    private java.util.List<FieldDto> product_attributes;

    @JsonProperty("item_attributes")
    private java.util.List<FieldDto> item_attributes;

    @JsonProperty("listen_events")
    private java.util.List<EventsEnum> listen_events;

    /**
     * The roles that need to be accepted by the company / 
     */
    @JsonProperty("requiredRoles")
    private java.util.List<RolesEnum> requiredRoles;

    @JsonProperty("unsupportedActions")
    private java.util.List<ActionsEnum> unsupportedActions;

    @JsonProperty("productTabs")
    private java.util.List<TabDto> productTabs;

    @JsonProperty("client")
    private java.util.List<ActionDto> client;

    @JsonProperty("item")
    private java.util.List<ActionDto> item;

    @JsonProperty("menu")
    private MenuDto menu;

    /**
     * Option that will appear in the "Settings" section (optional) / 
     */
    @JsonProperty("settings")
    private MenuDto settings;

    @JsonProperty("productTabs")
    private java.util.List<TabDto> productTabs;

    @JsonProperty("item")
    private java.util.List<ActionDto> item;

    @JsonProperty("menu")
    private MenuDto menu;

    /**
     * The url for the onboarding process after installation of the integration / 
     */
    @JsonProperty("onboardingUrl")
    private String onboardingUrl;

    @JsonProperty("payPerUseUnits")
    private java.util.List<UnitDto> payPerUseUnits;

    @JsonProperty("responseDataFieldNames")
    private java.util.Map<keyof ResponseDataDto, String> responseDataFieldNames;

}
