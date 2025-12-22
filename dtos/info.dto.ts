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
import { JSONSchema } from 'class-validator-jsonschema';
import { FieldDto } from './field.dto';
import { UniqueFieldInArray } from '../decorators/unique-field-in-array.validator';

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
  @JSONSchema({
    title: 'Title',
    description: 'Integration display title.',
    type: 'string',
    example: 'Example Product'
  })
  title!: string;

  /**
   * The URL of the integration's logo.
   * @example "https://example.com/logo.png"
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsOptional()
  @JSONSchema({
    title: 'Logo URL',
    description: 'Public HTTPS URL for the integration logo.',
    type: 'string',
    format: 'uri',
    example: 'https://cdn.example.com/logo.png'
  })
  logo?: string;

  /**
   * A brief description of the integration and its services.
   * @example "This integration provides a set of tools for managing your products."
   */
  @IsString()
  @IsOptional()
  @JSONSchema({
    title: 'Description',
    description: 'Short description of the integration.',
    type: 'string',
    example: 'An example product integration.'
  })
  description?: string;

  /**
   * A list of languages supported by the integration.
   */
  @IsDefined()
  @IsArray()
  @IsEnum(LanguageEnum, { each: true })
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Supported Languages',
    description: 'Locales supported by the integration.',
    type: 'array',
    items: { type: 'string', enum: Object.values(LanguageEnum) },
    example: ['EN']
  })
  supportedLanguages!: LanguageEnum[];

  /**
   * A list of actions that are supported by this integration.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(ActionsEnum, { each: true })
  @JSONSchema({
    title: 'Supported Actions',
    description: 'Actions supported by this integration.',
    type: 'array',
    items: { type: 'string', enum: Object.values(ActionsEnum) }
  })
  supportedActions?: ActionsEnum[] = [];

  /**
   * A list of events that the integration listens to.
   * This allows the integration to react to specific events in the system.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(EventsEnum, { each: true })
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Listen Events',
    description: 'Platform events the integration can subscribe to.',
    type: 'array',
    items: { type: 'string', enum: Object.values(EventsEnum) }
  })
  listenEvents?: EventsEnum[];

  /**
   * A list of roles that the company needs to accept for this integration to function correctly.
   */
  @IsOptional()
  @IsArray()
  @IsEnum(RolesEnum, { each: true })
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Required Roles',
    description: 'Roles required for this integration to operate.',
    type: 'array',
    items: { type: 'string', enum: Object.values(RolesEnum) }
  })
  requiredRoles?: RolesEnum[];

  /**
   * Configuration for the admin panel.
   * This section defines the entire user interface for the integration's admin panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => AdminPanelDto)
  @JSONSchema({
    title: 'Admin Panel',
    description: 'Admin UI links, tabs, and actions provided by the integration.',
    type: 'object'
  })
  adminPanel?: AdminPanelDto;

  /**
   * Configuration for the client panel.
   * This section defines the user interface for the integration's client-facing panel.
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => ClientPanelDto)
  @JSONSchema({
    title: 'Client Panel',
    description: 'Client UI links, tabs, and actions provided by the integration.',
    type: 'object'
  })
  clientPanel?: ClientPanelDto;

  /**
   * The URL for the onboarding process after the integration is installed.
   * This URL will be displayed in a popup or side sheet with a JWT for authentication.
   */
  @IsOptional()
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @JSONSchema({
    title: 'Onboarding URL',
    description: 'URL to onboard/configure the integration.',
    type: 'string',
    format: 'uri',
    example: 'https://example.com/onboarding'
  })
  onboardingUrl?: string;


  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => FieldDto)
  @UniqueFieldInArray('id')
  @JSONSchema({
    title: 'Setup Attributes',
    description: 'Configurable attributes that are used in the setup process.',
    type: 'array',
    items: { $ref: '#/components/schemas/FieldDto' }
  })
  setupAttributes?: FieldDto[];
}
