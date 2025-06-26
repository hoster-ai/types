import { SubmenuDto } from './tab.dto';

/**
 * Base properties shared by all menu items
 */
interface BaseMenuDto {
  /**
   * The icon to be displayed for the menu item
   */
  icon: string;

  /**
   * The name to be displayed for the menu item
   */
  label: string;
}

/**
 * Menu item with URL (no submenu)
 */
export interface MenuDtoWithUrl extends BaseMenuDto {
  type: 'only-url';
  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  url: string;

  submenu?: never; // Explicitly prevents submenu
}

/**
 * Menu item with submenu (no URL)
 */
export interface MenuDtoWithSubmenu extends BaseMenuDto {
  type: 'with-submenu';
  url?: never; // Explicitly prevents url

  /**
   * The list of tabs that will appear in the submenu and as a navigation bar above the main content
   * In case of only one tab, there will be neither a submenu nor a navigation bar.
   */
  submenu: SubmenuDto[];
}
