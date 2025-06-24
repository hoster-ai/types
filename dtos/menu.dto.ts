import { SubmenuDto, TabDto } from "./tab.dto";

export class MenuDto {
  /**
   * The icon to be displayed for the menu item
   */
  icon: string;

  /**
   * The name to be displayed for the menu item
   */
  label: string;

  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  url: string;

  /**
   * The list of tabs that will appear in the submenu and as a navigation bar above the main content
   * In case of only one tab, there will be neither a submenu nor a navigation bar.
   */
  submenu?: SubmenuDto[];
}