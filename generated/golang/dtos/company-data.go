package contracts

// CompanyDataDto represents a CompanyDataDto DTO
type CompanyDataDto struct {
	Id string `json:"id"`
	Name string `json:"name"`
	Emails []string `json:"emails"`
	InvoiceEmail string `json:"invoiceEmail"`
	PrivacyPolicyUrl string `json:"privacyPolicyUrl"`
	DefaultLanguage LanguageEnum `json:"defaultLanguage"`
	Languages []LanguageEnum `json:"languages"`
	Telephone string `json:"telephone"`
	Mobile *string `json:"mobile"`
	Address1 string `json:"address1"`
	Address2 *string `json:"address2"`
	Address3 *string `json:"address3"`
	Postcode string `json:"postcode"`
	City string `json:"city"`
	Country CountryEnum `json:"country"`
	State *string `json:"state"`
	Vat *string `json:"vat"`
	TaxOffice *string `json:"taxOffice"`
}
