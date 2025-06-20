// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// OpenMethodEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum OpenMethodEnum
    {
        [JsonPropertyName("ajax_call")]
        AJAX_CALL,

        [JsonPropertyName("small_iframe")]
        SMALL_IFRAME,

        [JsonPropertyName("medium_iframe")]
        MEDIUM_IFRAME,

        [JsonPropertyName("large_iframe")]
        LARGE_IFRAME

    }
}
