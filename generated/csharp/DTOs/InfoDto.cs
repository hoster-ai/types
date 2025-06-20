// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// InfoDto DTO
    /// </summary>
    public class InfoDto
    {
        /// <summary>
        /// The label displayed on the tab / 
        /// </summary>
        [JsonPropertyName("label")]
        [JsonRequired]
        public string Label { get; set; }

        /// <summary>
        /// The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company / 
        /// </summary>
        [JsonPropertyName("url")]
        [JsonRequired]
        public string Url { get; set; }

        /// <summary>
        /// The icon to be displayed for the menu item / 
        /// </summary>
        [JsonPropertyName("icon")]
        [JsonRequired]
        public string Icon { get; set; }

        /// <summary>
        /// The name to be displayed for the menu item / 
        /// </summary>
        [JsonPropertyName("label")]
        [JsonRequired]
        public string Label { get; set; }

        /// <summary>
        /// The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. / 
        /// </summary>
        [JsonPropertyName("tabs")]
        [JsonRequired]
        public List<TabDto> Tabs { get; set; }

        /// <summary>
        /// The title of the integration / 
        /// </summary>
        [JsonPropertyName("title")]
        [JsonRequired]
        public string Title { get; set; }

        /// <summary>
        /// The logo of the integration (optional) / 
        /// </summary>
        [JsonPropertyName("logo")]
        public string Logo { get; set; }

        /// <summary>
        /// Description of the integration and its services (optional) / 
        /// </summary>
        [JsonPropertyName("description")]
        public string Description { get; set; }

        [JsonPropertyName("supported_languages")]
        [JsonRequired]
        public List<LanguageEnum> Supported_languages { get; set; }

        [JsonPropertyName("product_attributes")]
        public List<FieldDto> Product_attributes { get; set; }

        [JsonPropertyName("item_attributes")]
        public List<FieldDto> Item_attributes { get; set; }

        [JsonPropertyName("listen_events")]
        public List<EventsEnum> Listen_events { get; set; }

        /// <summary>
        /// The roles that need to be accepted by the company / 
        /// </summary>
        [JsonPropertyName("requiredRoles")]
        public List<RolesEnum> RequiredRoles { get; set; }

        [JsonPropertyName("unsupportedActions")]
        [JsonRequired]
        public List<ActionsEnum> UnsupportedActions { get; set; }

        [JsonPropertyName("productTabs")]
        public List<TabDto> ProductTabs { get; set; }

        [JsonPropertyName("client")]
        public List<ActionDto> Client { get; set; }

        [JsonPropertyName("item")]
        public List<ActionDto> Item { get; set; }

        [JsonPropertyName("menu")]
        public MenuDto Menu { get; set; }

        /// <summary>
        /// Option that will appear in the "Settings" section (optional) / 
        /// </summary>
        [JsonPropertyName("settings")]
        public MenuDto Settings { get; set; }

        [JsonPropertyName("productTabs")]
        public List<TabDto> ProductTabs { get; set; }

        [JsonPropertyName("item")]
        public List<ActionDto> Item { get; set; }

        [JsonPropertyName("menu")]
        public MenuDto Menu { get; set; }

        /// <summary>
        /// The url for the onboarding process after installation of the integration / 
        /// </summary>
        [JsonPropertyName("onboardingUrl")]
        public string OnboardingUrl { get; set; }

        [JsonPropertyName("payPerUseUnits")]
        public List<UnitDto> PayPerUseUnits { get; set; }

        [JsonPropertyName("responseDataFieldNames")]
        public Dictionary<keyof ResponseDataDto, string> ResponseDataFieldNames { get; set; }

    }
}
