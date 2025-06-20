package contracts

// MessageTypeEnum enum values
type MessageTypeEnum string

const (
	MessageTypeEnumEMAIL MessageTypeEnum = "email"
	MessageTypeEnumSMS MessageTypeEnum = "sms"
	MessageTypeEnumPUSH MessageTypeEnum = "push"
)
