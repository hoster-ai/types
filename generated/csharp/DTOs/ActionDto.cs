// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// ActionDto DTO
    /// </summary>
    public class ActionDto
    {
        /// <summary>
        /// The icon of the action. / 
        /// </summary>
        [JsonPropertyName("icon")]
        [JsonRequired]
        public string Icon { get; set; }

        /// <summary>
        /// The label of the action (optional). / 
        /// </summary>
        [JsonPropertyName("label")]
        public string Label { get; set; }

        [JsonPropertyName("openMethod")]
        [JsonRequired]
        public OpenMethodEnum OpenMethod { get; set; }

        /// <summary>
        /// The link of the action. / 
        /// </summary>
        [JsonPropertyName("url")]
        [JsonRequired]
        public string Url { get; set; }

    }
}
