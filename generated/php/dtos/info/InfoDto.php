<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Info;

use Hoster\Contracts\Dtos\MenuDto;
use Hoster\Contracts\Enums\LanguageEnum;
use Hoster\Contracts\Enums\EventsEnum;
use Hoster\Contracts\Enums\RolesEnum;
use Hoster\Contracts\Enums\ActionsEnum;
use Hoster\Contracts\Dtos\TabDto;

class InfoDto 
{
    /**
     * @var DTO for tabs Used for defining tabs in the user interface class TabDto { The label displayed on the tab
     */
    public string $label;

    /**
     * @var The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company
     */
    public string $url;

    /**
     * @var DTO for menu items Extends TabDto and adds icon information class MenuDto { The icon to be displayed for the menu item
     */
    public string $icon;

    /**
     * @var The name to be displayed for the menu item
     */
    public string $label;

    /**
     * @var The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. => TabDto) tabs: TabDto[]; } DTO for integration information Contains all information related to a service integration export class InfoDto { The title of the integration
     */
    public string $title;

    /**
     * @var The logo of the integration (optional)
     */
    public ?string $logo;

    /**
     * @var Description of the integration and its services (optional)
     */
    public ?string $description;

    /**
     * @var LanguageEnum[]
     */
    public array $supported_languages;

    /**
     * @var FieldDto[]
     */
    public ?array $product_attributes;

    /**
     * @var FieldDto[]
     */
    public ?array $item_attributes;

    /**
     * @var EventsEnum[]
     */
    public ?array $listen_events;

    /**
     * @var The roles that need to be accepted by the company
     * @var RolesEnum[]
     */
    public ?array $requiredRoles;

    /**
     * @var ActionsEnum[]
     */
    public array $unsupportedActions = [];

    public ?{ $adminPanel;

    /**
     * @var TabDto[]
     */
    public ?array $productTabs;

    public ?{ $actions;

    /**
     * @var ActionDto[]
     */
    public ?array $client;

    /**
     * @var ActionDto[]
     */
    public ?array $item;

    public ?MenuDto $menu;

    /**
     * @var Option that will appear in the "Settings" section (optional)
     */
    public ?MenuDto $settings;

    public ?{ $clientPanel;

    /**
     * @var TabDto[]
     */
    public ?array $productTabs;

    public ?{ $actions;

    /**
     * @var ActionDto[]
     */
    public ?array $item;

    public ?MenuDto $menu;

    /**
     * @var The url for the onboarding process after installation of the integration
     */
    public ?string $onboardingUrl;

    /**
     * @var UnitDto[]
     */
    public ?array $payPerUseUnits;

    /**
     * @var array<keyof ResponseDataDto, string>
     */
    public ?array $responseDataFieldNames;
}
