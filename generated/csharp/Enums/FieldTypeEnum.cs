// Auto-generated from TypeScript
using System.Text.Json.Serialization;

namespace Hoster.Contracts.Enums
{
    /// <summary>
    /// FieldTypeEnum enumeration
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum FieldTypeEnum
    {
        [JsonPropertyName("TEXT_BOX")]
        TEXT_BOX,

        [JsonPropertyName("TEXT_AREA")]
        TEXT_AREA,

        [JsonPropertyName("SELECT")]
        SELECT,

        [JsonPropertyName("MULTI_SELECT")]
        MULTI_SELECT,

        [JsonPropertyName("DESCRIPTION")]
        DESCRIPTION,

        [JsonPropertyName("RADIO_BOX")]
        RADIO_BOX,

        [JsonPropertyName("CHECKBOX")]
        CHECKBOX,

        [JsonPropertyName("SLIDER")]
        SLIDER

    }
}
