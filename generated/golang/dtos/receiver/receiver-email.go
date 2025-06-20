package contracts

// EmailReceiverDto represents a EmailReceiverDto DTO
type EmailReceiverDto struct {
	// The main email address / 
	To string `json:"to"`
	// List of email addresses for carbon copy (optional) Must be valid and unique email addresses / 
	Cc *[]string `json:"cc"`
	// List of email addresses for blind carbon copy (optional) Must be valid and unique email addresses / 
	Bcc *[]string `json:"bcc"`
}
