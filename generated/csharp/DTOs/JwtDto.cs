// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// JwtDto DTO
    /// </summary>
    public class JwtDto
    {
        /// <summary>
        /// Integration identifier / 
        /// </summary>
        [JsonPropertyName("integrationId")]
        [JsonRequired]
        public string IntegrationId { get; set; }

        /// <summary>
        /// Unique user identifier that triggers the API call (only the /send method will not contain userId). / 
        /// </summary>
        [JsonPropertyName("userId")]
        public string UserId { get; set; }

        /// <summary>
        /// Unique company identifier / 
        /// </summary>
        [JsonPropertyName("companyId")]
        [JsonRequired]
        public string CompanyId { get; set; }

        /// <summary>
        /// The roles accepted by the company for this integration / 
        /// </summary>
        [JsonPropertyName("acceptedRoles")]
        [JsonRequired]
        public List<RolesEnum> AcceptedRoles { get; set; }

    }
}
