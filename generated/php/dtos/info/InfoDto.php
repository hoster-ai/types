<?php declare(strict_types=1);

namespace Hoster\Contracts\Dtos\Info;



class InfoDto 
{
    /**
     * @var DTO for tabs Used for defining tabs in the user interface class TabDto { The label displayed on the tab @IsString() @IsNotEmpty() label: string; The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company @IsString() @IsNotEmpty() @IsUrl() url: string; } DTO for menu items Extends TabDto and adds icon information class MenuDto { The icon to be displayed for the menu item @IsString() @IsNotEmpty() icon: string; The name to be displayed for the menu item @IsString() @IsNotEmpty() label: string; The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. @IsArray() @MinLength(1) @ValidateNested({ each: true }) @Type(() => TabDto) tabs: TabDto[]; } DTO for integration information Contains all information related to a service integration export class InfoDto { The title of the integration @IsString() @IsNotEmpty() title: string; The logo of the integration (optional) @IsString() @IsOptional() logo?: string; Description of the integration and its services (optional) @IsString() @IsOptional() description?: string; @IsArray({ each: true }) @IsEnum(LanguageEnum) supported_languages: LanguageEnum[]; product_attributes?: FieldDto[]; item_attributes?: FieldDto[]; listen_events?: EventsEnum[]; The roles that need to be accepted by the company @IsArray() @IsEnum(RolesEnum, { each: true }) requiredRoles?: RolesEnum[]; unsupportedActions: ActionsEnum[] = []; adminPanel?: { productTabs?: TabDto[]; actions?: { client?: ActionDto[]; item?: ActionDto[]; }; menu?: MenuDto; Option that will appear in the "Settings" section (optional)
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
