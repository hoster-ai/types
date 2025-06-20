package contracts

// EmailSenderDto represents a EmailSenderDto DTO
type EmailSenderDto struct {
	// The full name of the sender / 
	FullName string `json:"fullName"`
	// The email subject Length restriction from 1 to 500 characters / 
	Subject string `json:"subject"`
	// The message content Length restriction from 1 to 50000 characters / 
	Message string `json:"message"`
	// File attachments (optional) / 
	Attachments *[]AttachmentDto `json:"attachments"`
}
