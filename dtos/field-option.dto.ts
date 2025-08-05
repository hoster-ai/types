import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';

/**
 * Data Transfer Object for field options.
 * This class defines the structure and properties of a field option
 * that can be used in form fields.
 */
export class FieldOptionDto {
  /**
   * Key of the field option
   */
  @IsString()
  @IsDefined()
  key!: string;

  /**
   * Value of the field option
   */
  @IsString()
  @IsDefined()
  value!: string;

  /**
   * Indicates if the field option is disabled
   */
  @IsBoolean()
  @IsOptional()
  disabled?: boolean = false;
}
