package contracts

// MultilangTextDto represents a MultilangTextDto DTO
type MultilangTextDto struct {
	Language LanguageEnum `json:"language"`
	Text string `json:"text"`
}
