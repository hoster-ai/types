// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// RequestDto DTO
    /// </summary>
    public class RequestDto
    {
        /// <summary>
        /// Unique identifier of the hoster message / 
        /// </summary>
        [JsonPropertyName("notificationId")]
        [JsonRequired]
        public string NotificationId { get; set; }

        /// <summary>
        /// Sender details according to the integration's notification type / 
        /// </summary>
        [JsonPropertyName("sender")]
        [JsonRequired]
        public object Sender { get; set; }

        /// <summary>
        /// Recipient details according to the integration's notification type / 
        /// </summary>
        [JsonPropertyName("receiver")]
        [JsonRequired]
        public object Receiver { get; set; }

    }
}
