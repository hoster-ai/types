// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// UnitDto DTO
    /// </summary>
    public class UnitDto
    {
        [JsonPropertyName("id")]
        [JsonRequired]
        public string Id { get; set; }

        [JsonPropertyName("intervalDescription")]
        [JsonRequired]
        public string IntervalDescription { get; set; }

    }
}
