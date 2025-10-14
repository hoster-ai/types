import { IsBoolean, IsDefined, IsOptional, IsString } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({ 
    title: 'Key', 
    description: 'Internal key for the option.', 
    type: 'string' 
  })
  key!: string;

  /**
   * Value of the field option
   */
  @IsString()
  @IsDefined()
  @JSONSchema({ 
    title: 'Value', 
    description: 'Display value for the option.', 
    type: 'string' 
  })
  value!: string;

  /**
   * Indicates if the field option is disabled
   */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({ 
    title: 'Disabled', 
    description: 'Whether the option is disabled.', 
    type: 'boolean' 
  })
  disabled?: boolean = false;
}
