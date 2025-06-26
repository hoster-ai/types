/**
 * DTO for tabs
 * Used for defining tabs in the user interface
 */
export class TabDto {
  /**
   * The label displayed on the tab
   */
  label!: string;

  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  url!: string;
}

export class SubmenuDto extends TabDto {}
