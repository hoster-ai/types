package contracts

// SmsSenderDto represents a SmsSenderDto DTO
type SmsSenderDto struct {
	// Sender's phone number Must be a valid phone number / 
	SenderPhone string `json:"senderPhone"`
	// The content of the SMS message / 
	Message string `json:"message"`
}
