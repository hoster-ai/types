import { IsString, IsDefined, IsNotEmpty } from "class-validator";
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * DTO for billing units.
 * Used for defining units for pay-per-use billing.
 */
export class UnitDto {
  /**
   * The unique identifier for the unit.
   * @example "ram"
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Unit ID', 
    description: 'Unit identifier.', 
    type: 'string', 
    example: 'messages' 
  })
  id!: string;

  /**
   * The description of the unit.
   * @example "MB"
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Unit Description', 
    description: 'What is measured.', 
    type: 'string', 
    example: 'Message sent' 
  })
  unitDescription!: string;

  /**
   * The description of the billing interval.
   * @example "month"
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Interval Description', 
    description: 'Billing interval.', 
    type: 'string', 
    example: 'Per month' 
  })
  intervalDescription!: string;
}
