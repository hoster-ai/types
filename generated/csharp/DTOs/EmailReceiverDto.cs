// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// EmailReceiverDto DTO
    /// </summary>
    public class EmailReceiverDto
    {
        /// <summary>
        /// The main email address / 
        /// </summary>
        [JsonPropertyName("to")]
        [JsonRequired]
        public string To { get; set; }

        /// <summary>
        /// List of email addresses for carbon copy (optional) Must be valid and unique email addresses / 
        /// </summary>
        [JsonPropertyName("cc")]
        public List<string> Cc { get; set; }

        /// <summary>
        /// List of email addresses for blind carbon copy (optional) Must be valid and unique email addresses / 
        /// </summary>
        [JsonPropertyName("bcc")]
        public List<string> Bcc { get; set; }

    }
}
