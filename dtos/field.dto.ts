import { IsOfAllowedTypes } from '../decorators/is-of-allowed-types.validator';
import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsDefined,
  IsArray,
  ArrayMinSize,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { MultilangTextDto } from './multilang-text.dto';
import { FieldOptionDto } from './field-option.dto';
import { IsRegex } from '../decorators/is-regex.validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Data Transfer Object for a form field.
 * This class defines the structure and properties of a single field
 * that can be used in a user interface form.
 */
export class FieldDto {
  /**
   * ID of action field
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
   * Label of action field
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
   * Value of the field.
   *
   * String is when it is input, text area
   * Number is when it is number
   * FieldOptionDto is when it is checkbox
   * FieldOptionDto[] is when it is radioboxes or select
   */
  @IsDefined()
  @IsOfAllowedTypes(['string', 'number', 'object', 'array'], {
    objectClass: FieldOptionDto,
    arrayElementClass: FieldOptionDto,
    require: true,
    objectNotEmpty: true,
    arrayNotEmpty: true,
  })
  @JSONSchema({
    title: 'Value',
    description:
      'Value of the field. String/Number, or FieldOptionDto/FieldOptionDto[] depending on type.',
    oneOf: [
      { title: 'String', type: 'string' },
      { title: 'Number', type: 'number' },
      { title: 'Option', $ref: '#/components/schemas/FieldOptionDto' },
      {
        title: 'Options Array',
        type: 'array',
        items: { $ref: '#/components/schemas/FieldOptionDto' },
      },
    ],
  })
  value!: string | number | FieldOptionDto | FieldOptionDto[];

  /**
   * Type of the field
   */
  @IsEnum(FieldTypeEnum)
  @IsDefined()
  @JSONSchema({
    title: 'Field Type',
    description: 'Type of the field.',
    type: 'string',
    enum: Object.values(FieldTypeEnum),
  })
  type!: FieldTypeEnum;

  /**
   * Indicates if the field is required
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
   * Indicates if the field is disabled
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
   * Indicates if the field is hidden
   */
  @IsBoolean()
  @IsOptional()
  hidden?: boolean;


  /**
   * Regex validation pattern for the field
   */
  @IsString()
  @IsRegex()
  @IsOptional()
  @JSONSchema({
    title: 'Regex Validation',
    description: 'Optional regex to validate input.',
    type: 'string',
    example: '^[A-Za-z0-9_-]+$',
  })
  regexValidation?: string;

  /**
   * Error message for the field for supported languages
   */
  @ValidateIf((o) => !!o.regexValidation)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  @JSONSchema({
    title: 'Regex Validation Error Message',
    description: 'Localized error message shown when regex validation fails.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  regexValidationErrorMessage?: MultilangTextDto[];

  /**
   * Whether remote validation should be triggered
   */
  @IsBoolean()
  @IsOptional()
  triggersRemoteValidation?: boolean;

  /**
   * Remote validation error message for supported languages
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
   * The item attribute is upgradable
   * If the user has the permission to upgrade the item from his panel
   * TODO: Let's see if this approach is the best way for the user to upgrade their item
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Upgradable',
    description: 'Whether the item attribute is upgradable by the user.',
    type: 'boolean',
  })
  upgradable?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Downgradable',
    description: 'Whether the item attribute is downgradable by the user.',
    type: 'boolean',
  })
  downgradable?: boolean = false;
}
