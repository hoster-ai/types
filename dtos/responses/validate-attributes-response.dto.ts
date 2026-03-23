import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseResponse } from '../base-response.dto';
import { FieldDto } from '../field.dto';

/**
 * Represents the response from validating product attributes.
 * Contains the list of attributes that have been validated.
 */
export class ValidateAttributesResponseDto extends BaseResponse {
  /**
   * An array of field DTOs representing the validated attributes.
   * Each `FieldDto` contains details about a single attribute.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @JSONSchema({
    title: 'Validated Attributes',
    description:
      'An array of field DTOs representing the validated attributes.',
    type: 'array',
    items: { $ref: '#/components/schemas/FieldDto' },
  })
  validatedAttributes!: FieldDto[];
}
