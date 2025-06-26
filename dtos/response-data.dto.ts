/**
 * DTO for response data.
 * Used to return a generic data object in API responses.
 */
export class ResponseDataDto {
  /**
   * A record of key-value pairs representing the response data.
   */
  data!: Record<string, unknown>;
}
