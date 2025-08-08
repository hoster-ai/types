import { IsString, IsDefined, IsUrl } from "class-validator";

/**
 * DTO for tabs
 * Used for defining tabs in the user interface
 */
export class TabDto {
  /**
   * The label displayed on the tab
   */
  @IsString()
  @IsDefined()
  label!: string;

  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsDefined()
  url!: string;
}
