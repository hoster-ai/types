import { ProductActionsEnum } from '../enums/actions.enum';
import { EventsEnum } from '../enums/events.enum';
import { LanguageEnum } from '../enums/language.enum';
import { RolesEnum } from '../enums/roles.enum';
import { ActionDto } from './action.dto';
import { TabDto } from './tab.dto';
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from './menu.dto';

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
  title!: string;

  /**
   * The URL of the integration's logo.
   * @example "https://example.com/logo.png"
   */
  logo?: string;

  /**
   * A brief description of the integration and its services.
   * @example "This integration provides a set of tools for managing your products."
   */
  description?: string;

  /**
   * A list of languages supported by the integration.
   */
  supportedLanguages!: LanguageEnum[];

  /**
   * A list of actions that are supported by this integration.
   */
  supportedActions?: ProductActionsEnum[] = [];

  /**
   * A list of events that the integration listens to.
   * This allows the integration to react to specific events in the system.
   */
  listenEvents?: EventsEnum[];

  /**
   * A list of roles that the company needs to accept for this integration to function correctly.
   */
  requiredRoles?: RolesEnum[];

  /**
   * Configuration for the admin panel.
   * This section defines the entire user interface for the integration's admin panel.
   */
  adminPanel?: {
    /**
     * Defines the tab structure for different sections of the admin panel.
     * Each property represents a section (e.g., product, item) and contains an array of TabDto objects.
     */
    tabs?: {
      /** Tabs for the product management section. */
      product: TabDto[];
      /** Tabs for the item management section. */
      item: TabDto[];
      /** Tabs for the client management section. */
      client: TabDto[];
      /** Tabs for the user management section. */
      user: TabDto[];
      /** Tabs for the order management section. */
      order: TabDto[];
    };

    /**
     * Defines additional actions that can be performed in different sections of the admin panel.
     */
    moreActions?: {
      /** Actions available in the client management section. */
      client?: ActionDto[];
      /** Actions available in the item management section. */
      item?: ActionDto[];
      /** Actions available in the invoice management section. */
      invoice?: ActionDto[];
      /** Actions available in the user management section. */
      user?: ActionDto[];
      /** Actions available in the order management section. */
      order?: ActionDto[];
    };

    /**
     * The main menu for the admin panel.
     * This can be a simple menu with a URL or a menu with submenus.
     */
    menu?: MenuDtoWithSubmenu | MenuDtoWithUrl;

    /**
     * Configuration for the integration's settings page.
     */
    settings?: {
      /** The label for the settings page. */
      label: string;
      /** The icon for the settings page. */
      icon: string;
      /** A description of the settings page. */
      descrition: string;
    } & (
      | { url: string; tabs?: never } // If url is provided, tabs should not be present
      | { url?: never; tabs: [TabDto, ...TabDto[]] } // If tabs is provided (at least one tab), url should not be present
    );
  };

  /**
   * Configuration for the client panel.
   * This section defines the user interface for the integration's client-facing panel.
   */
  clientPanel?: {
    /**
     * Defines the tab structure for the client panel.
     */
    tabs?: {
      /** Tabs for the item management section. */
      item: TabDto[];
    };

    /**
     * Defines additional actions that can be performed in the client panel.
     */
    moreActions?: {
      /** Actions available in the item management section. */
      item?: ActionDto[];
    };

    /**
     * The main menu for the client panel.
     * This can be a simple menu with a URL or a menu with submenus.
     */
    menu?: MenuDtoWithSubmenu | MenuDtoWithUrl;
  };

  /**
   * The URL for the onboarding process after the integration is installed.
   * This URL will be displayed in a popup or side sheet with a JWT for authentication.
   */
  onboardingUrl?: string;
}
