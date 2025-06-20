// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// SmsSenderDto DTO
    /// </summary>
    public class SmsSenderDto
    {
        /// <summary>
        /// Sender's phone number Must be a valid phone number / 
        /// </summary>
        [JsonPropertyName("senderPhone")]
        [JsonRequired]
        public string SenderPhone { get; set; }

        /// <summary>
        /// The content of the SMS message / 
        /// </summary>
        [JsonPropertyName("message")]
        [JsonRequired]
        public string Message { get; set; }

    }
}
