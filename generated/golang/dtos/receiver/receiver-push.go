package contracts

// PushReceiverDto represents a PushReceiverDto DTO
type PushReceiverDto struct {
	// The user ID that will receive the push notification / 
	UserId string `json:"userId"`
	// List of user device tokens Must contain at least one token / 
	DeviceTokens []string `json:"deviceTokens"`
}
