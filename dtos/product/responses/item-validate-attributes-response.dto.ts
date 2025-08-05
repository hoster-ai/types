import { BaseResponse } from '../../base-response.dto';
import { FieldDto } from '../../field.dto';

/**
 * Represents the response from validating item attributes.
 * Contains the list of attributes that have been validated.
 */
export class ItemValidateAttributesResponseDto extends BaseResponse {
  /**
   * An array of field DTOs representing the validated attributes.
   * Each `FieldDto` contains details about a single attribute.
   */
  validatedAttributes!: FieldDto[];
}
