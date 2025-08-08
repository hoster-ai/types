import { ActionsEnum } from '../enums/actions.enum';
import { EventsEnum } from '../enums/events.enum';
import { LanguageEnum } from '../enums/language.enum';
import { RolesEnum } from '../enums/roles.enum';
// import { ActionDto } from './action.dto';
// import { TabDto } from './tab.dto';
// import { MenuDtoWithSubmenu, MenuDtoWithUrl } from './menu.dto';
import { IsString, IsUrl, IsOptional, ValidateNested, IsArray, ArrayMinSize, IsEnum, IsNotEmpty, IsDefined } from 'class-validator';
import { Type } from 'class-transformer';
import { AdminPanelDto } from './admin-panel.dto';
import { ClientPanelDto } from './client-panel.dto';

/**
 * DTO for integration information.
 * This is a central DTO that contains all the necessary information
 * for a service integration, including UI configuration, supported features,
 * and billing details.
 */
export class InfoDto {
  /**
   * The display title of the integration.
   * @example "My Awesome Integration"
   */
  @IsString()
  @IsNotEmpty()
  title!: string;

  /**
   * The URL of the integration's logo.
   * @example "https://example.com/logo.png"
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsOptional()
  logo?: string;

  /**
   * A brief description of the integration and its services.
   * @example "This integration provides a set of tools for managing your products."
   */
  @IsString()
  @IsOptional()
  description?: string;

  /**
   * A list of languages supported by the integration.
   */
  @IsDefined()
  @IsArray()
  @IsEnum(LanguageEnum, { each: true })
  @ArrayMinSize(1)
  supportedLanguages!: LanguageEnum[];

  /**
   * A list of actions that are supported by this integration.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(ActionsEnum, { each: true })
  @ArrayMinSize(1)
  supportedActions?: ActionsEnum[] = [];

  /**
   * A list of events that the integration listens to.
   * This allows the integration to react to specific events in the system.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(EventsEnum, { each: true })
  @ArrayMinSize(1)
  listenEvents?: EventsEnum[];

  /**
   * A list of roles that the company needs to accept for this integration to function correctly.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @ArrayMinSize(1)
  requiredRoles?: RolesEnum[];

  /**
   * Configuration for the admin panel.
   * This section defines the entire user interface for the integration's admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelDto)
  adminPanel?: AdminPanelDto;

  /**
   * Configuration for the client panel.
   * This section defines the user interface for the integration's client-facing panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientPanelDto)
  clientPanel?: ClientPanelDto;

  /**
   * The URL for the onboarding process after the integration is installed.
   * This URL will be displayed in a popup or side sheet with a JWT for authentication.
   */
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  onboardingUrl?: string;
}
