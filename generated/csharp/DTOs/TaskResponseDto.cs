// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// TaskResponseDto DTO
    /// </summary>
    public class TaskResponseDto
    {
        /// <summary>
        /// The ID of the task that was created / 
        /// </summary>
        [JsonPropertyName("taskId")]
        [JsonRequired]
        public string TaskId { get; set; }

    }
}
