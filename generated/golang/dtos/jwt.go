package contracts

// JwtDto represents a JwtDto DTO
type JwtDto struct {
	// Integration identifier / 
	IntegrationId string `json:"integrationId"`
	// Unique user identifier that triggers the API call (only the /send method will not contain userId). / 
	UserId *string `json:"userId"`
	// Unique company identifier / 
	CompanyId string `json:"companyId"`
	// The roles accepted by the company for this integration / 
	AcceptedRoles []RolesEnum `json:"acceptedRoles"`
}
