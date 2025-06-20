package contracts

// ActionDto represents a ActionDto DTO
type ActionDto struct {
	// The icon of the action. / 
	Icon string `json:"icon"`
	// The label of the action (optional). / 
	Label *string `json:"label"`
	OpenMethod OpenMethodEnum `json:"openMethod"`
	// The link of the action. / 
	Url string `json:"url"`
}
