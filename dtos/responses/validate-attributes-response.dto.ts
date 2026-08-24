import { IsArray } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseResponse } from '../base-response.dto';
import { AnyFieldDto } from '../fields/any-field.dto';

/**
 * Represents the response from validating product attributes.
 * Contains the list of attributes that have been validated.
 */
export class ValidateAttributesResponseDto extends BaseResponse {
  /**
   * An array of concrete field DTOs (discriminated by `type`) representing the
   * validated attributes.
   */
  @IsArray()
  @JSONSchema({
    title: 'Validated Attributes',
    description:
      'Array of concrete field DTOs (each discriminated by its `type` literal).',
    type: 'array',
    items: { $ref: '#/components/schemas/AnyFieldDto' },
  })
  validatedAttributes!: AnyFieldDto[];
}
