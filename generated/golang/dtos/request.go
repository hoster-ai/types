package contracts

// RequestDto represents a RequestDto DTO
type RequestDto struct {
	// Unique identifier of the hoster message / 
	NotificationId string `json:"notificationId"`
	// Sender details according to the integration's notification type / 
	Sender EmailSenderDto | SmsSenderDto | PushSenderDto `json:"sender"`
	// Recipient details according to the integration's notification type / 
	Receiver EmailReceiverDto | SmsReceiverDto | PushReceiverDto `json:"receiver"`
}
