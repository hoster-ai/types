// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// ErrorResponseDto DTO
    /// </summary>
    public class ErrorResponseDto
    {
        /// <summary>
        /// Unique error identifier Used for error reporting and tracking / 
        /// </summary>
        [JsonPropertyName("code")]
        [JsonRequired]
        public string Code { get; set; }

        /// <summary>
        /// Array or text with error messages May contain one or more messages describing the error / 
        /// </summary>
        [JsonPropertyName("errors")]
        public object Errors { get; set; }

    }
}
