// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// SetupStatusEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SetupStatusEnum
    {
        [JsonPropertyName("success")]
        SUCCESS,

        [JsonPropertyName("failure")]
        FAILURE,

        [JsonPropertyName("pending")]
        PENDING

    }
}
