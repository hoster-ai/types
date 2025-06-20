// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// BaseResponse DTO
    /// </summary>
    public class BaseResponse
    {
        /// <summary>
        /// Response code / 
        /// </summary>
        [JsonPropertyName("code")]
        [JsonRequired]
        public double Code { get; set; }

        /// <summary>
        /// Response message / 
        /// </summary>
        [JsonPropertyName("message")]
        [JsonRequired]
        public string Message { get; set; }

    }
}
