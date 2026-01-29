import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsOptional, ValidateIf, ValidateNested } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";
import { FieldDto } from "./field.dto";
import { MultilangTextDto } from "./multilang-text.dto";

export class AttributeFieldDto extends FieldDto {

  /**
   * Indicates if the field is hidden in order
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Hidden',
    description: 'Whether the field is hidden.',
    type: 'boolean',
  })
  hidden?: boolean = false;

  /**
 * Indicates if the field is disabled
 */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Disabled',
    description: 'Whether the field is disabled.',
    type: 'boolean',
  })
  disabled!: boolean;

  /**
   * Indicates if the field triggers remote validation
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Triggers Remote Validation',
    description: 'If true, field triggers remote validation.',
    type: 'boolean',
  })
  triggersRemoteValidation?: boolean = false;

  /**
   * Error message for the field for supported languages
   */
  @ValidateIf((o) => o.triggersRemoteValidation === true)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsOptional()
  @JSONSchema({
    title: 'Remote Validation Error Message',
    description: 'Localized error messages for remote validation.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  remoteValidationErrorMessage?: MultilangTextDto[];

}