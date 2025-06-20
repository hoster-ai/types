// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// PushReceiverDto DTO
    /// </summary>
    public class PushReceiverDto
    {
        /// <summary>
        /// The user ID that will receive the push notification / 
        /// </summary>
        [JsonPropertyName("userId")]
        [JsonRequired]
        public string UserId { get; set; }

        /// <summary>
        /// List of user device tokens Must contain at least one token / 
        /// </summary>
        [JsonPropertyName("deviceTokens")]
        [JsonRequired]
        public List<string> DeviceTokens { get; set; }

    }
}
