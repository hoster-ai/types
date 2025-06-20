package contracts

// PushSenderDto represents a PushSenderDto DTO
type PushSenderDto struct {
	// Unique identifier of the message Length restriction from 1 to 255 characters / 
	MessageId string `json:"messageId"`
	// The user ID that will receive the push notification Length restriction from 1 to 255 characters / 
	UserId string `json:"userId"`
	// The title of the push notification Length restriction from 1 to 255 characters / 
	Title string `json:"title"`
	// The content of the push notification Length restriction from 1 to 1000 characters / 
	Message string `json:"message"`
	// The subtitle of the push notification (optional) Length restriction from 1 to 255 characters / 
	Subtitle *string `json:"subtitle"`
}
