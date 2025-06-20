// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// AttachmentDto DTO
    /// </summary>
    public class AttachmentDto
    {
        /// <summary>
        /// The name of the attached file / 
        /// </summary>
        [JsonPropertyName("filename")]
        [JsonRequired]
        public string Filename { get; set; }

        /// <summary>
        /// The content of the file in Base64 encoding / 
        /// </summary>
        [JsonPropertyName("content")]
        [JsonRequired]
        public string Content { get; set; }

        /// <summary>
        /// The content type of the file (MIME type) / 
        /// </summary>
        [JsonPropertyName("contentType")]
        public string ContentType { get; set; }

    }
}
