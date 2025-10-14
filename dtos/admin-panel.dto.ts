import {
  ValidateNested,
  IsOptional,
  IsArray,
  ArrayMinSize,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { TabDto } from './tab.dto';
import { ActionDto } from './action.dto';
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from './menu.dto';
import { SettingsWithTabsDto, SettingsWithUrlDto } from './settings.dto';
import { transformSettings } from '../transformers/settings.transformer';
import { transformMenu } from '../transformers/menu.transformer';
import { IsOneOf } from '../decorators/is-one-of.validator';
import { AtLeastOneNonEmptyProperty } from '../decorators/at-least-one-non-empty.validator';
import { JSONSchema } from 'class-validator-jsonschema';


@AtLeastOneNonEmptyProperty(['product', 'item', 'client', 'user', 'order'])
export class AdminPanelTabsDto {
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Product Tabs', 
    description: 'Tabs shown on the product detail page in Admin panel.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  product?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Item Tabs', 
    description: 'Tabs shown on the item detail page in Admin panel.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  item?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Client Tabs', 
    description: 'Tabs shown on the client profile page in Admin panel.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  client?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'User Tabs', 
    description: 'Tabs shown on the user page in Admin panel.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  user?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Order Tabs', 
    description: 'Tabs shown on the order page in Admin panel.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  order?: TabDto[];
}

@AtLeastOneNonEmptyProperty(['client', 'item', 'invoice', 'user', 'order'])
export class AdminPanelMoreActionsDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @JSONSchema({
    title: 'Client Actions', 
    description: 'Additional actions available on the client page.',
    type: 'array',
    items: { $ref: '#/components/schemas/ActionDto' }
  })
  client?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @JSONSchema({
    title: 'Item Actions', 
    description: 'Additional actions available on the item page.',
    type: 'array',
    items: { $ref: '#/components/schemas/ActionDto' }
  })
  item?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @JSONSchema({
    title: 'Invoice Actions', 
    description: 'Additional actions available on the invoice page.',
    type: 'array',
    items: { $ref: '#/components/schemas/ActionDto' }
  })
  invoice?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @JSONSchema({
    title: 'User Actions', 
    description: 'Additional actions available on the user page.',
    type: 'array',
    items: { $ref: '#/components/schemas/ActionDto' }
  })
  user?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @JSONSchema({
    title: 'Order Actions', 
    description: 'Additional actions available on the order page.',
    type: 'array',
    items: { $ref: '#/components/schemas/ActionDto' }
  })
  order?: ActionDto[];
}

@AtLeastOneNonEmptyProperty(['tabs', 'moreActions', 'menu', 'settings'])
export class  AdminPanelDto {
  /**
   * Defines the tab structure for different sections of the admin panel.
   * Each property represents a section (e.g., product, item) and contains an array of TabDto objects.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelTabsDto)
  @JSONSchema({
    title: 'Tabs', 
    description: 'Tab structure for Admin panel sections.',
    type: 'object',
    properties: { tabs: { $ref: '#/components/schemas/AdminPanelTabsDto' } }
  })
  tabs?: AdminPanelTabsDto;

  /**
   * Defines additional actions that can be performed in different sections of the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelMoreActionsDto)
  @JSONSchema({
    title: 'More Actions', 
    description: 'Additional actions in Admin panel sections.',
    type: 'object',
    properties: { moreActions: { $ref: '#/components/schemas/AdminPanelMoreActionsDto' } }
  })
  moreActions?: AdminPanelMoreActionsDto;

  /**
   * The main menu for the admin panel.
   * This can be a simple menu with a URL or a menu with submenus.
   */
  @IsOptional()
  @Transform(({ value }) => transformMenu(value))
  @ValidateNested()
  @IsOneOf([MenuDtoWithUrl, MenuDtoWithSubmenu], {
    message: 'menu must be MenuDtoWithUrl or MenuDtoWithSubmenu',
  })
  @JSONSchema({
    title: 'Menu', 
    description: 'Admin panel main menu (URL or submenu variant).',
    type: 'object',
    oneOf: [
      { $ref: '#/components/schemas/MenuDtoWithSubmenu' },
      { $ref: '#/components/schemas/MenuDtoWithUrl' }
    ]
  })
  menu?: MenuDtoWithSubmenu | MenuDtoWithUrl;

  /**
   * Configuration for the integration's settings page.
   */
  @IsOptional()
  @Transform(({ value }) => transformSettings(value))
  @ValidateNested()
  @IsOneOf([SettingsWithUrlDto, SettingsWithTabsDto], {
    message: 'settings must be SettingsWithUrlDto or SettingsWithTabsDto',
  })
  @JSONSchema({
    title: 'Settings', 
    description: 'Admin panel settings page configuration.',
    type: 'object',
    oneOf: [
      { $ref: '#/components/schemas/SettingsWithUrlDto' },
      { $ref: '#/components/schemas/SettingsWithTabsDto' }
    ]
  })
  settings?: SettingsWithUrlDto | SettingsWithTabsDto;
}
