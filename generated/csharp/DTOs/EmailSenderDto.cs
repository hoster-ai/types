// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// EmailSenderDto DTO
    /// </summary>
    public class EmailSenderDto
    {
        /// <summary>
        /// The full name of the sender / 
        /// </summary>
        [JsonPropertyName("fullName")]
        [JsonRequired]
        public string FullName { get; set; }

        /// <summary>
        /// The email subject Length restriction from 1 to 500 characters / 
        /// </summary>
        [JsonPropertyName("subject")]
        [JsonRequired]
        public string Subject { get; set; }

        /// <summary>
        /// The message content Length restriction from 1 to 50000 characters / 
        /// </summary>
        [JsonPropertyName("message")]
        [JsonRequired]
        public string Message { get; set; }

        /// <summary>
        /// File attachments (optional) / 
        /// </summary>
        [JsonPropertyName("attachments")]
        public List<AttachmentDto> Attachments { get; set; }

    }
}
