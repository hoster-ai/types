import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  IsUrl,
  IsNotEmpty,
  MinLength,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { MessageTypeEnum } from '../enums/message-type.enum';
import { RolesEnum } from '../enums/roles.enum';

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
 * DTO for integration information
 * Contains all information related to a service integration
 */
export class IntegrationInfoDto {
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
   * The notification type which can be email, sms or push
   * Each integration supports only one type of notification
   */
  @IsEnum(MessageTypeEnum)
  @IsNotEmpty()
  type: MessageTypeEnum;

  /**
   * Option that will appear in the "Settings" section (optional)
   */
  @IsOptional()
  @Type(() => MenuDto)
  settings?: MenuDto;

  /**
   * Option that will appear in the "Main Menu" section (optional)
   */
  @IsOptional()
  @Type(() => MenuDto)
  menu?: MenuDto;

  /**
   * The roles that need to be accepted by the company
   */
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  requiredRoles?: RolesEnum[];

  /**
   * The url for the onboarding process after installation of the integration
   */
  @IsOptional()
  @IsUrl()
  onboardingUrl?: string;
}
