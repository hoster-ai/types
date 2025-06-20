// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// ActionsEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ActionsEnum
    {
        [JsonPropertyName("CREATE")]
        CREATE,

        [JsonPropertyName("RENEW")]
        RENEW,

        [JsonPropertyName("UPGRADE")]
        UPGRADE,

        [JsonPropertyName("DOWNGRADE")]
        DOWNGRADE,

        [JsonPropertyName("SUSPEND")]
        SUSPEND,

        [JsonPropertyName("UNSUSPEND")]
        UNSUSPEND,

        [JsonPropertyName("DELETE")]
        DELETE

    }
}
