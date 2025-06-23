import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUrl,
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsObject,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ActionsEnum } from '../../enums/actions.enum';
import { EventsEnum } from '../../enums/events.enum';
import { FieldDto } from '../field.dto';
import { ResponseDataDto } from '../response-data.dto';
import { UnitDto } from '../unit.dto';
import { LanguageEnum } from '../../enums/language.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { ActionDto } from '../action.dto';

/**
 * DTO for integration information
 * Contains all information related to a service integration
 */
export class InfoDto {
  /**
   * The title of the integration
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * The logo of the integration (optional)
   */
  @IsString()
  @IsOptional()
  logo?: string;

  /**
   * Description of the integration and its services (optional)
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * List of supported languages for the integration.
   */
  @IsArray()
  @IsEnum(LanguageEnum, { each: true })
  supported_languages: LanguageEnum[];

  /**
   * Custom attributes for products.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @IsOptional()
  product_attributes?: FieldDto[];

  /**
   * Custom attributes for items.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @IsOptional()
  item_attributes?: FieldDto[];

  /**
   * Events that the integration listens to.
   */
  @IsArray()
  @IsEnum(EventsEnum, { each: true })
  @IsOptional()
  listen_events?: EventsEnum[];

  /**
   * The roles that need to be accepted by the company
   */
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @IsOptional()
  requiredRoles?: RolesEnum[];

  /**
   * Actions that are not supported by the integration.
   */
  @IsArray()
  @IsEnum(ActionsEnum, { each: true })
  @IsOptional()
  unsupportedActions?: ActionsEnum[] = [];

  /**
   * Configuration for the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelDto)
  adminPanel?: AdminPanelDto;

  /**
   * Configuration for the client panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientPanelDto)
  clientPanel?: ClientPanelDto;

  /**
   * The url for the onboarding process after installation of the integration
   */
  @IsOptional()
  @IsUrl()
  onboardingUrl?: string;

  /**
   * Units for pay-per-use billing.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UnitDto)
  @IsOptional()
  payPerUseUnits?: UnitDto[];

  /**
   * Mapping of response data field names.
   */
  @IsObject()
  @IsOptional()
  responseDataFieldNames?: Record<keyof ResponseDataDto, string>;
}

/**
 * DTO for tabs
 * Used for defining tabs in the user interface
 */
class TabDto {
  /**
   * The label displayed on the tab
   */
  @IsString()
  @IsNotEmpty()
  label: string;

  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  url: string;
}

/**
 * DTO for menu items
 * Extends TabDto and adds icon information
 */
class MenuDto {
  /**
   * The icon to be displayed for the menu item
   */
  @IsString()
  @IsNotEmpty()
  icon: string;

  /**
   * The name to be displayed for the menu item
   */
  @IsString()
  @IsNotEmpty()
  label: string;

  /**
   * The list of tabs that will appear in the submenu and as a navigation bar above the main content
   * In case of only one tab, there will be neither a submenu nor a navigation bar.
   */
  @IsArray()
  @MinLength(1)
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  tabs: TabDto[];
}

/**
 * DTO for the tabs in the admin panel.
 */
class AdminPanelTabsDto {
  /**
   * Tabs related to products.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  product: TabDto[];

  /**
   * Tabs related to items.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  item: TabDto[];

  /**
   * Tabs related to clients.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  client: TabDto[];
}

/**
 * DTO for actions available in a panel.
 */
class PanelActionsDto {
  /**
   * Actions related to clients.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @IsOptional()
  client?: ActionDto[];

  /**
   * Actions related to items.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @IsOptional()
  item?: ActionDto[];
}

/**
 * DTO for the admin panel configuration.
 */
class AdminPanelDto {
  /**
   * Configuration for the tabs in the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelTabsDto)
  tabs?: AdminPanelTabsDto;

  /**
   * Additional actions available in the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => PanelActionsDto)
  moreActions?: PanelActionsDto;

  /**
   * Main menu for the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => MenuDto)
  menu?: MenuDto;

  /**
   * Settings menu for the admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => MenuDto)
  settings?: MenuDto;
}

/**
 * DTO for the tabs in the client panel.
 */
class ClientPanelTabsDto {
  /**
   * Tabs related to items.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  item: TabDto[];
}

/**
 * DTO for actions available in the client panel.
 */
class ClientPanelActionsDto {
  /**
   * Actions related to items.
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  @IsOptional()
  item?: ActionDto[];
}

/**
 * DTO for the client panel configuration.
 */
class ClientPanelDto {
  /**
   * Configuration for the tabs in the client panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientPanelTabsDto)
  tabs?: ClientPanelTabsDto;

  /**
   * Additional actions available in the client panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientPanelActionsDto)
  moreActions?: ClientPanelActionsDto;

  /**
   * Main menu for the client panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => MenuDto)
  menu?: MenuDto;
}