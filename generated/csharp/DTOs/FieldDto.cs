// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// FieldDto DTO
    /// </summary>
    public class FieldDto
    {
        /// <summary>
        /// ID of action field / 
        /// </summary>
        [JsonPropertyName("id")]
        [JsonRequired]
        public string Id { get; set; }

        /// <summary>
        /// Label of action field / 
        /// </summary>
        [JsonPropertyName("label")]
        [JsonRequired]
        public List<MultilangTextDto> Label { get; set; }

        /// <summary>
        /// Value of action field / 
        /// </summary>
        [JsonPropertyName("value")]
        [JsonRequired]
        public object Value { get; set; }

        /// <summary>
        /// Type of label / 
        /// </summary>
        [JsonPropertyName("type")]
        [JsonRequired]
        public FieldTypeEnum Type { get; set; }

        /// <summary>
        /// Indicates if the field is required / 
        /// </summary>
        [JsonPropertyName("required")]
        [JsonRequired]
        public bool Required { get; set; }

        /// <summary>
        /// Indicates if the field is disabled / 
        /// </summary>
        [JsonPropertyName("disabled")]
        [JsonRequired]
        public bool Disabled { get; set; }

        /// <summary>
        /// Indicates if the field is hidden / 
        /// </summary>
        [JsonPropertyName("hidden")]
        [JsonRequired]
        public bool Hidden { get; set; }

        /// <summary>
        /// Regex validation pattern for the field / 
        /// </summary>
        [JsonPropertyName("regexValidation")]
        public string RegexValidation { get; set; }

        /// <summary>
        /// Error message for the field for supported languages / 
        /// </summary>
        [JsonPropertyName("regexValidationErrorMessage")]
        public List<MultilangTextDto> RegexValidationErrorMessage { get; set; }

        /// <summary>
        /// Indicates if the field has remote validation / 
        /// </summary>
        [JsonPropertyName("remoteValidation")]
        public bool RemoteValidation { get; set; }

        /// <summary>
        /// Error message for the field / 
        /// </summary>
        [JsonPropertyName("remoteValidationErrorMessage")]
        public List<MultilangTextDto> RemoteValidationErrorMessage { get; set; }

    }
}
