package contracts

// ErrorResponseDto represents a ErrorResponseDto DTO
type ErrorResponseDto struct {
	// Unique error identifier Used for error reporting and tracking / 
	Code string `json:"code"`
	// Array or text with error messages May contain one or more messages describing the error / 
	Errors *[]string | string `json:"errors"`
}
