// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// SuccessResponseDto DTO
    /// </summary>
    public class SuccessResponseDto
    {
        /// <summary>
        /// The ID of the notification that was sent / 
        /// </summary>
        [JsonPropertyName("notificationId")]
        [JsonRequired]
        public string NotificationId { get; set; }

    }
}
