package contracts

// FieldDto represents a FieldDto DTO
type FieldDto struct {
	// ID of action field / 
	Id string `json:"id"`
	// Label of action field / 
	Label []MultilangTextDto `json:"label"`
	// Value of action field / 
	Value map[string]interface{} `json:"value"`
	// Type of label / 
	Type FieldTypeEnum `json:"type"`
	// Indicates if the field is required / 
	Required bool `json:"required"`
	// Indicates if the field is disabled / 
	Disabled bool `json:"disabled"`
	// Indicates if the field is hidden / 
	Hidden bool `json:"hidden"`
	// Regex validation pattern for the field / 
	RegexValidation *string `json:"regexValidation"`
	// Error message for the field for supported languages / 
	RegexValidationErrorMessage *[]MultilangTextDto `json:"regexValidationErrorMessage"`
	// Indicates if the field has remote validation / 
	RemoteValidation *bool `json:"remoteValidation"`
	// Error message for the field / 
	RemoteValidationErrorMessage *[]MultilangTextDto `json:"remoteValidationErrorMessage"`
}
