import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDefined,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { JSONSchema } from 'class-validator-jsonschema';
import { MultilangTextDto } from './multilang-text.dto';

/**
 * Abstract base shared by every concrete field DTO (TextFieldDto, NumberFieldDto, ...).
 *
 * Concrete classes add a string-literal `type` discriminator and a typed `value` plus any
 * type-specific options (min/max, regex validation for text, etc.).
 */
export abstract class BaseFieldDto {
  /**
   * Unique identifier for the field.
   */
  @IsString()
  @IsDefined()
  @JSONSchema({
    title: 'ID',
    description: 'Unique identifier for the field.',
    type: 'string',
  })
  id!: string;

  /**
   * Multilingual label for the field.
   */
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Label',
    description: 'Multilingual label for the field.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  label!: MultilangTextDto[];

  /**
   * Whether the field is required.
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Required',
    description: 'Whether the field is required.',
    type: 'boolean',
  })
  required?: boolean;

  /**
   * Whether the field is disabled.
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Disabled',
    description: 'Whether the field is disabled.',
    type: 'boolean',
  })
  disabled?: boolean;

  /**
   * Whether the field is hidden.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Hidden',
    description: 'Whether the field is hidden.',
    type: 'boolean',
  })
  hidden?: boolean;

  /**
   * Whether remote validation should be triggered.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Triggers Remote Validation',
    description:
      'Whether remote validation should be triggered for this field.',
    type: 'boolean',
  })
  triggersRemoteValidation?: boolean;

  /**
   * Localized error message shown when remote validation fails.
   */
  @ValidateIf((o) => !!o.triggersRemoteValidation)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @JSONSchema({
    title: 'Remote Validation Error Message',
    description: 'Localized error message shown when remote validation fails.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  remoteValidationErrorMessage?: MultilangTextDto[];

  /**
   * Whether the item attribute is upgradable by the user.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Upgradable',
    description: 'Whether the item attribute is upgradable by the user.',
    type: 'boolean',
  })
  upgradable?: boolean = false;

  /**
   * Whether the item attribute is downgradable by the user.
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Downgradable',
    description: 'Whether the item attribute is downgradable by the user.',
    type: 'boolean',
  })
  downgradable?: boolean = false;
}
