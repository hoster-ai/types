import { ActionsEnum } from '../../enums/actions.enum';
import { EventsEnum } from '../../enums/events.enum';
import { FieldDto } from '../field.dto';
import { ResponseDataDto } from '../response-data.dto';
import { UnitDto } from '../unit.dto';
import { LanguageEnum } from '../../enums/language.enum';
import { RolesEnum } from '../../enums/roles.enum';
import { ActionDto } from '../action.dto';
import { TabDto } from '../tab.dto';
import { MenuDto } from '../menu.dto';

/**
 * DTO for integration information
 * Contains all information related to a service integration
 */
export class InfoDto {
  /**
   * The title of the integration
   */
  title: string;

  /**
   * The logo of the integration (optional)
   */
  logo?: string;

  /**
   * Description of the integration and its services (optional)
   */
  description?: string;

  /**
   * List of supported languages for the integration.
   */
  supported_languages: LanguageEnum[];

  /**
   * Custom attributes for products.
   */
  product_attributes?: FieldDto[];

  /**
   * Custom attributes for items.
   */
  item_attributes?: FieldDto[];

  /**
   * Events that the integration listens to.
   */
  listen_events?: EventsEnum[];

  /**
   * The roles that need to be accepted by the company
   */
  requiredRoles?: RolesEnum[];

  /**
   * Actions that are not supported by the integration.
   */
  unsupportedActions?: ActionsEnum[] = [];

  /**
   * Configuration for the admin panel.
   * Contains all UI and action configuration for the admin interface.
   */
  adminPanel?: {
    /** Tab groups for different admin panel sections in the admin panel. */
    tabs?: {
      /** Tabs related to products. */
      product: TabDto[];
      /** Tabs related to items. */
      item: TabDto[];
      /** Tabs related to clients. */
      client: TabDto[];
      /** Tabs related to users. */
      user: TabDto[];
      /** Tabs related to orders. */
      order: TabDto[];
    };
    /** Additional actions available in the admin panel. */
    moreActions?: {
      /** Actions related to clients. */
      client?: ActionDto[];
      /** Actions related to items. */
      item?: ActionDto[];
      /** Actions related to invoices. */
      invoice?: ActionDto[];
      /** Actions related to users. */
      user?: ActionDto[];
      /** Actions related to orders. */
      order?: ActionDto[];
    };
    /** Main menu for the admin panel. Extends TabDto and adds icon information */
    menu?: MenuDto;
    /** Settings menu for the admin panel. Extends TabDto and adds icon information */
    settings?: MenuDto;
  };

  /**
   * Configuration for the client panel.
   * Contains all UI and action configuration for the client interface.
   */
  clientPanel?: {
    /** Tab groups for the client panel. */
    tabs?: {
      /** Tabs related to items. */
      item: TabDto[];
    };
    /** Additional actions available in the client panel. */
    moreActions?: {
      /** Actions related to items. */
      item?: ActionDto[];
    };
    /** Main menu for the client panel. 
     * Each menu must have at least one TabDto.
     * If there are no submenus, the label of the TabDto will be displayed in the panel.
     * If there are submenus, the label of the MenuDto and the TabDtos of the MenuDto will be displayed in the panel.
     * The TabDtos of the MenuDto will be the submenus of the MenuDto.
     */
    menu?: MenuDto;
  };


  /**
   * The url for the onboarding process after installation of the integration
   */
  onboardingUrl?: string;

  /**
   * Units for pay-per-use billing.
   */
  payPerUseUnits?: UnitDto[];

  /**
   * Mapping of response data field names.
   */
  responseDataFieldNames?: Record<keyof ResponseDataDto, string>;
}

