// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// SmsReceiverDto DTO
    /// </summary>
    public class SmsReceiverDto
    {
        /// <summary>
        /// List of recipient phone numbers Must be valid phone numbers / 
        /// </summary>
        [JsonPropertyName("receiverPhones")]
        [JsonRequired]
        public List<string> ReceiverPhones { get; set; }

    }
}
