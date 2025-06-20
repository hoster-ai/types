package contracts

// InfoDto represents a InfoDto DTO
type InfoDto struct {
	// The label displayed on the tab / 
	Label string `json:"label"`
	// The URL associated with the tab. The requests coming from the hoster will be signed with jwt, which will contain information about the company / 
	Url string `json:"url"`
	// The icon to be displayed for the menu item / 
	Icon string `json:"icon"`
	// The name to be displayed for the menu item / 
	Label string `json:"label"`
	// The list of tabs that will appear in the submenu and as a navigation bar above the main content In case of only one tab, there will be neither a submenu nor a navigation bar. / 
	Tabs []TabDto `json:"tabs"`
	// The title of the integration / 
	Title string `json:"title"`
	// The logo of the integration (optional) / 
	Logo *string `json:"logo"`
	// Description of the integration and its services (optional) / 
	Description *string `json:"description"`
	Supported_languages []LanguageEnum `json:"supported_languages"`
	Product_attributes *[]FieldDto `json:"product_attributes"`
	Item_attributes *[]FieldDto `json:"item_attributes"`
	Listen_events *[]EventsEnum `json:"listen_events"`
	// The roles that need to be accepted by the company / 
	RequiredRoles *[]RolesEnum `json:"requiredRoles"`
	UnsupportedActions [][]ActionsEnum =  `json:"unsupportedActions"`
	ProductTabs *[]TabDto `json:"productTabs"`
	Client *[]ActionDto `json:"client"`
	Item *[]ActionDto `json:"item"`
	Menu *MenuDto `json:"menu"`
	// Option that will appear in the "Settings" section (optional) / 
	Settings *MenuDto `json:"settings"`
	ProductTabs *[]TabDto `json:"productTabs"`
	Item *[]ActionDto `json:"item"`
	Menu *MenuDto `json:"menu"`
	// The url for the onboarding process after installation of the integration / 
	OnboardingUrl *string `json:"onboardingUrl"`
	PayPerUseUnits *[]UnitDto `json:"payPerUseUnits"`
	ResponseDataFieldNames *map[keyof ResponseDataDto]string `json:"responseDataFieldNames"`
}
