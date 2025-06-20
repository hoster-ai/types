package contracts

// AttachmentDto represents a AttachmentDto DTO
type AttachmentDto struct {
	// The name of the attached file / 
	Filename string `json:"filename"`
	// The content of the file in Base64 encoding / 
	Content string `json:"content"`
	// The content type of the file (MIME type) / 
	ContentType *string `json:"contentType"`
}
