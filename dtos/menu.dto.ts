import { IsDefined, IsIn, IsString, IsNotEmpty, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { IsPropertyForbidden } from '../decorators/is-property-forbidden.validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { TabDto } from './tab.dto';

/**
 * Base properties shared by all menu items.
 */
export class BaseMenuDto {
  /**
   * The icon to be displayed for the menu item.
   * @example "home"
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Icon',
    description: 'Icon for the menu item.',
    type: 'string',
  })
  icon!: string;

  /**
   * The name to be displayed for the menu item.
   * @example "Dashboard"
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Label',
    description: 'Label for the menu item.',
    type: 'string',
  })
  label!: string;
}

/**
 * Represents a menu item that links directly to a URL.
 * This type of menu item does not have a submenu.
 */
export class MenuDtoWithUrl extends BaseMenuDto {
  /**
   * The type of the menu item. This is a discriminator property.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Type',
    description: 'Type of the menu item.',
    type: 'string',
  })
  @IsIn(['only-url'])
  type!: 'only-url';

  /**
   * The URL associated with the menu item.
   * Requests from the hoster will be signed with a JWT containing company information.
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsNotEmpty()
  @JSONSchema({
    title: 'URL',
    description: 'URL associated with the menu item.',
    type: 'string',
    format: 'uri'
  })
  url!: string;

  /**
   * Explicitly prevents a submenu from being added to this type of menu item.
   */
  @IsPropertyForbidden('submenu', { message: 'submenu is forbidden in MenuDtoWithUrl' })
  submenu?: never;
}

/**
 * Represents a menu item that contains a submenu.
 * This type of menu item does not have a direct URL.
 */
export class MenuDtoWithSubmenu extends BaseMenuDto {
  /**
   * The type of the menu item. This is a discriminator property.
   */
  @IsString()
  @IsNotEmpty()
  @IsIn(['with-submenu'])
  @JSONSchema({
    title: 'Type',
    description: 'Type of the menu item.',
    type: 'string',
  })
  type!: 'with-submenu';
  /**
   * Explicitly prevents a URL from being added to this type of menu item.
   */
  @IsPropertyForbidden('url', { message: 'url is forbidden in MenuDtoWithSubmenu' })
  url?: never;

  /**
   * The list of tabs that will appear in the submenu.
   * If there is only one tab, no submenu or navigation bar will be displayed.
   */
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @JSONSchema({
    title: 'Submenu',
    description: 'List of tabs that will appear in the submenu.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  submenu!: TabDto[];
}
