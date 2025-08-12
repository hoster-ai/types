import { IsString, IsDefined, IsNotEmpty } from "class-validator";

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
  id!: string;

  /**
   * The description of the unit.
   * @example "MB"
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  unitDescription!: string;

  /**
   * The description of the billing interval.
   * @example "month"
   */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  intervalDescription!: string;
}
