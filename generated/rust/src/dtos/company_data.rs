use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
pub struct CompanyData {
    pub id: String,
    pub name: String,
    pub emails: Vec<String>,
    pub invoice_email: String,
    pub privacy_policy_url: String,
    pub default_language: LanguageEnum,
    pub languages: Vec<LanguageEnum>,
    pub telephone: String,
    pub mobile: Option<String>,
    pub address1: String,
    pub address2: Option<String>,
    pub address3: Option<String>,
    pub postcode: String,
    pub city: String,
    pub country: CountryEnum,
    pub state: Option<String>,
    pub vat: Option<String>,
    pub tax_office: Option<String>,
}
