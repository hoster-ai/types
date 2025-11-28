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
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { MultilangTextDto } from './multilang-text.dto';
import { FieldOptionDto } from './field-option.dto';
import { IsRegex } from '../decorators/is-regex.validator';
import { AllOrNoneProperty } from '../decorators/all-or-none.validator';
import { MinLessOrEqualMaxProperty } from '../decorators/min-less-or-equal.validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Data Transfer Object for a form field.
 * This class defines the structure and properties of a single field
 * that can be used in a user interface form.
 */
@AllOrNoneProperty(['repeatableMin', 'repeatableMax'])
@MinLessOrEqualMaxProperty(['repeatableMin', 'repeatableMax'])
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

  @IsOptional()
  @IsNumber()
  repeatableMin?: number;

  @IsOptional()
  @IsNumber()
  repeatableMax?: number;

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
  required!: boolean;

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
   * Indicates if the field is hidden in order
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Visible In Order',
    description: 'Whether the field is visible in order.',
    type: 'boolean',
  })
  visibleInOrder!: boolean;

  /**
   * Indicates if the field is visible in client panel
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Visible In Client Panel',
    description: 'Whether the field is visible in client panel.',
    type: 'boolean',
  })
  visibleInClientPanel!: boolean;

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
  @IsOptional()
  @JSONSchema({
    title: 'Regex Validation Error Message',
    description: 'Localized error message shown when regex validation fails.',
    type: 'array',
    items: { $ref: '#/components/schemas/MultilangTextDto' },
  })
  regexValidationErrorMessage?: MultilangTextDto[];

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

  /**
   * The item attribute is upgradable
   * If the user has the permission to upgrade the item from his panel
   * TODO: Let's see if this approach is the best way for the user to upgrade their item
   */
  @IsBoolean()
  @IsDefined()
  @JSONSchema({
    title: 'Upgradable',
    description: 'Whether the item attribute is upgradable by the user.',
    type: 'boolean',
  })
  upgradable: boolean = false;
}
