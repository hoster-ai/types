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


@AtLeastOneNonEmptyProperty(['product', 'item', 'client', 'user', 'order'])
export class AdminPanelTabsDto {
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  product?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  item?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  client?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  user?: TabDto[];

  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  order?: TabDto[];
}

@AtLeastOneNonEmptyProperty(['client', 'item', 'invoice', 'user', 'order'])
export class AdminPanelMoreActionsDto {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  client?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  item?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  invoice?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  user?: ActionDto[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  order?: ActionDto[];
}

@AtLeastOneNonEmptyProperty(['tabs', 'moreActions', 'menu', 'settings'])
export class AdminPanelDto {
  /**
   * Defines the tab structure for different sections of the admin panel.
   * Each property represents a section (e.g., product, item) and contains an array of TabDto objects.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelTabsDto)
  tabs?: AdminPanelTabsDto;

  /**
   * Defines additional actions that can be performed in different sections of the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelMoreActionsDto)
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
  settings?: SettingsWithUrlDto | SettingsWithTabsDto;
}
