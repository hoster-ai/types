import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for response data.
 * Used to return a generic data object in API responses.
 */
export class ResponseDataDto {
  /**
   * A record of key-value pairs representing the response data.
   */
  @JSONSchema({
    title: 'Data',
    description: 'A record of key-value pairs representing the response data.',
    type: 'object',
    additionalProperties: true,
  })
  data!: Record<string, unknown>;
}
