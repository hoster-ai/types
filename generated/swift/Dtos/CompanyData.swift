import Foundation

struct CompanyData: Codable {
    let id: String
    let name: String
    let emails: [String]
    let invoiceEmail: String
    let privacyPolicyUrl: String
    let defaultLanguage: LanguageEnum
    let languages: [LanguageEnum]
    let telephone: String
    let mobile: String?
    let address1: String
    let address2: String?
    let address3: String?
    let postcode: String
    let city: String
    let country: CountryEnum
    let state: String?
    let vat: String?
    let taxOffice: String?
}
