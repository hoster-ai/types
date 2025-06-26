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

/**
 * DTO for submenus.
 * Extends the TabDto to represent a submenu item.
 */
export class SubmenuDto extends TabDto {}
