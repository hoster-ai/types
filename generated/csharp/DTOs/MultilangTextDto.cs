// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// MultilangTextDto DTO
    /// </summary>
    public class MultilangTextDto
    {
        [JsonPropertyName("language")]
        [JsonRequired]
        public LanguageEnum Language { get; set; }

        [JsonPropertyName("text")]
        [JsonRequired]
        public string Text { get; set; }

    }
}
