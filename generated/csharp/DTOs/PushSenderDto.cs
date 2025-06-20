// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// PushSenderDto DTO
    /// </summary>
    public class PushSenderDto
    {
        /// <summary>
        /// Unique identifier of the message Length restriction from 1 to 255 characters / 
        /// </summary>
        [JsonPropertyName("messageId")]
        [JsonRequired]
        public string MessageId { get; set; }

        /// <summary>
        /// The user ID that will receive the push notification Length restriction from 1 to 255 characters / 
        /// </summary>
        [JsonPropertyName("userId")]
        [JsonRequired]
        public string UserId { get; set; }

        /// <summary>
        /// The title of the push notification Length restriction from 1 to 255 characters / 
        /// </summary>
        [JsonPropertyName("title")]
        [JsonRequired]
        public string Title { get; set; }

        /// <summary>
        /// The content of the push notification Length restriction from 1 to 1000 characters / 
        /// </summary>
        [JsonPropertyName("message")]
        [JsonRequired]
        public string Message { get; set; }

        /// <summary>
        /// The subtitle of the push notification (optional) Length restriction from 1 to 255 characters / 
        /// </summary>
        [JsonPropertyName("subtitle")]
        public string Subtitle { get; set; }

    }
}
