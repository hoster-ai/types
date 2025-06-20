// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// MessageTypeEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum MessageTypeEnum
    {
        [JsonPropertyName("email")]
        EMAIL,

        [JsonPropertyName("sms")]
        SMS,

        [JsonPropertyName("push")]
        PUSH

    }
}
