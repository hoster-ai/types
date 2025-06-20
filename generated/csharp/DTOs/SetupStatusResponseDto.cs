// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// SetupStatusResponseDto DTO
    /// </summary>
    public class SetupStatusResponseDto
    {
        [JsonPropertyName("status")]
        [JsonRequired]
        public SetupStatusEnum Status { get; set; }

    }
}
