import {
  IsString,
  IsEnum,
  IsBoolean,
  IsOptional,
  ValidateNested,
  IsDefined,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { MultilangTextDto } from './multilang-text.dto';
import { FieldOptionDto } from './field-option.dto';

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
  value!: string | number | FieldOptionDto | FieldOptionDto[];

  /**
   * Type of the field
   */
  @IsEnum(FieldTypeEnum)
  type!: FieldTypeEnum;

  /**
   * Indicates if the field is required
   */
  @IsBoolean()
  required!: boolean;

  /**
   * Indicates if the field is disabled
   */
  @IsBoolean()
  disabled!: boolean;

  /**
   * Indicates if the field is hidden
   */
  @IsBoolean()
  hidden!: boolean;

  /**
   * Regex validation pattern for the field
   */
  @IsString()
  @IsOptional()
  regexValidation?: string;

  /**
   * Error message for the field for supported languages
   */
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
  upgradable: boolean = false;
}
