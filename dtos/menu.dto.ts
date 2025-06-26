import { SubmenuDto } from './submenu.dto';

/**
 * Base properties shared by all menu items.
 */
interface BaseMenuDto {
  /**
   * The icon to be displayed for the menu item.
   * @example "home"
   */
  icon: string;

  /**
   * The name to be displayed for the menu item.
   * @example "Dashboard"
   */
  label: string;
}

/**
 * Represents a menu item that links directly to a URL.
 * This type of menu item does not have a submenu.
 */
export interface MenuDtoWithUrl extends BaseMenuDto {
  /**
   * The type of the menu item. This is a discriminator property.
   */
  type: 'only-url';
  /**
   * The URL associated with the menu item.
   * Requests from the hoster will be signed with a JWT containing company information.
   */
  url: string;

  /**
   * Explicitly prevents a submenu from being added to this type of menu item.
   */
  submenu?: never;
}

/**
 * Represents a menu item that contains a submenu.
 * This type of menu item does not have a direct URL.
 */
export interface MenuDtoWithSubmenu extends BaseMenuDto {
  /**
   * The type of the menu item. This is a discriminator property.
   */
  type: 'with-submenu';
  /**
   * Explicitly prevents a URL from being added to this type of menu item.
   */
  url?: never;

  /**
   * The list of tabs that will appear in the submenu.
   * If there is only one tab, no submenu or navigation bar will be displayed.
   */
  submenu: SubmenuDto[];
}
