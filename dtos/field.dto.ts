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

/**
 * Data Transfer Object for a form field.
 * This class defines the structure and properties of a single field
 * that can be used in a user interface form.
 */
@AllOrNoneProperty(['reapetableMin', 'reapetableMax'])
@MinLessOrEqualMaxProperty(['reapetableMin', 'reapetableMax'])
export class FieldDto {
  /**
   * ID of action field
   */
  @IsString()
  @IsDefined()
  id!: string;

  /**
   * Label of action field
   */
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsArray()
  @ArrayMinSize(1)
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
  // @IsDefined()
  // @ValidateIf(o => typeof o.value === 'string')
  // @IsString({ message: 'Value must be a valid string' })
  // @ValidateIf(o => typeof o.value === 'number')
  // @IsNumber({}, { message: 'Value must be a valid number' })
  // @ValidateIf(o => Array.isArray(o.value))
  // @IsArray({ message: 'Value must be an array' })
  // @ValidateNested({ each: true })
  // @Type(() => FieldOptionDto)
  // @ValidateIf(o => typeof o.value === 'object' && !Array.isArray(o.value))
  // @ValidateNested()
  // @Type(() => FieldOptionDto)
  value!: string | number | FieldOptionDto | FieldOptionDto[];

  /**
   * Type of the field
   */
  @IsEnum(FieldTypeEnum)
  @IsDefined()
  type!: FieldTypeEnum;

  @IsOptional()
  @IsNumber()
  reapetableMin?: number;

  @IsOptional()
  @IsNumber()
  reapetableMax?: number;

  /**
   * Indicates if the field is required
   */
  @IsBoolean()
  @IsDefined()
  required!: boolean;

  /**
   * Indicates if the field is disabled
   */
  @IsBoolean()
  @IsDefined()
  disabled!: boolean;

  /**
   * Indicates if the field is hidden
   */
  @IsBoolean()
  @IsDefined()
  hidden!: boolean;

  /**
   * Regex validation pattern for the field
   */
  @IsString()
  @IsRegex()
  @IsOptional()
  regexValidation?: string;

  /**
   * Error message for the field for supported languages
   */
  @ValidateIf((o) => !!o.regexValidation)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsOptional()
  regexValidationErrorMessage?: MultilangTextDto[];

  /**
   * Indicates if the field triggers remote validation
   */
  @IsBoolean()
  @IsOptional()
  triggersRemoteValidation?: boolean = false;

  /**
   * Error message for the field for supported languages
   */
  @ValidateIf((o) => o.triggersRemoteValidation === true)
  @ValidateNested({ each: true })
  @Type(() => MultilangTextDto)
  @IsOptional()
  remoteValidationErrorMessage?: MultilangTextDto[];

  /**
   * The item attribute is upgradable
   * If the user has the permission to upgrade the item from his panel
   * TODO: Let's see if this approach is the best way for the user to upgrade their item
   */
  @IsBoolean()
  @IsDefined()
  upgradable: boolean = false;
}
