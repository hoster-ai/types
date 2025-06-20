package contracts

// SmsReceiverDto represents a SmsReceiverDto DTO
type SmsReceiverDto struct {
	// List of recipient phone numbers Must be valid phone numbers / 
	ReceiverPhones []string `json:"receiverPhones"`
}
