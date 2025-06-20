// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// InfoNotificationDto DTO
    /// </summary>
    public class InfoNotificationDto
    {
        [JsonPropertyName("type")]
        [JsonRequired]
        public MessageTypeEnum Type { get; set; }

    }
}
