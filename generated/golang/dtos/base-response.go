package contracts

// BaseResponse represents a BaseResponse DTO
type BaseResponse struct {
	// Response code / 
	Code float64 `json:"code"`
	// Response message / 
	Message string `json:"message"`
}
