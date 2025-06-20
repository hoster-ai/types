# Auto-generated from TypeScript
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any, Union


@dataclass
class InfoDto:
    # The label displayed on the tab / 
    label: str
    # The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company / 
    url: str
    # The icon to be displayed for the menu item / 
    icon: str
    # The name to be displayed for the menu item / 
    label: str
    # The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. / 
    tabs: List[TabDto] = field(default_factory=list)
    # The title of the integration / 
    title: str
    # The logo of the integration (optional) / 
    logo: Optional[str] = None
    # Description of the integration and its services (optional) / 
    description: Optional[str] = None
    supported_languages: List[LanguageEnum] = field(default_factory=list)
    product_attributes: Optional[List[FieldDto]] = None
    item_attributes: Optional[List[FieldDto]] = None
    listen_events: Optional[List[EventsEnum]] = None
    # The roles that need to be accepted by the company / 
    requiredRoles: Optional[List[RolesEnum]] = None
    unsupportedActions: List[ActionsEnum] = []
    productTabs: Optional[List[TabDto]] = None
    client: Optional[List[ActionDto]] = None
    item: Optional[List[ActionDto]] = None
    menu: Optional[MenuDto] = None
    # Option that will appear in the "Settings" section (optional) / 
    settings: Optional[MenuDto] = None
    productTabs: Optional[List[TabDto]] = None
    item: Optional[List[ActionDto]] = None
    menu: Optional[MenuDto] = None
    # The url for the onboarding process after installation of the integration / 
    onboardingUrl: Optional[str] = None
    payPerUseUnits: Optional[List[UnitDto]] = None
    responseDataFieldNames: Optional[Dict[keyof ResponseDataDto, str]] = None
