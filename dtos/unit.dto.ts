/**
 * DTO for billing units.
 * Used for defining units for pay-per-use billing.
 */
export class UnitDto {
  /**
   * The unique identifier for the unit.
   * @example "ram"
   */
  id!: string;

  /**
   * The description of the unit.
   * @example "MB"
   */
  unitDescription!: string;

  /**
   * The description of the billing interval.
   * @example "month"
   */
  intervalDescription!: string;
}
