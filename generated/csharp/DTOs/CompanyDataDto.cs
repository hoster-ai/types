// Auto-generated from TypeScript
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Hoster.Contracts.DTOs
{
    /// <summary>
    /// CompanyDataDto DTO
    /// </summary>
    public class CompanyDataDto
    {
        [JsonPropertyName("id")]
        [JsonRequired]
        public string Id { get; set; }

        [JsonPropertyName("name")]
        [JsonRequired]
        public string Name { get; set; }

        [JsonPropertyName("emails")]
        [JsonRequired]
        public List<string> Emails { get; set; }

        [JsonPropertyName("invoiceEmail")]
        [JsonRequired]
        public string InvoiceEmail { get; set; }

        [JsonPropertyName("privacyPolicyUrl")]
        [JsonRequired]
        public string PrivacyPolicyUrl { get; set; }

        [JsonPropertyName("defaultLanguage")]
        [JsonRequired]
        public LanguageEnum DefaultLanguage { get; set; }

        [JsonPropertyName("languages")]
        [JsonRequired]
        public List<LanguageEnum> Languages { get; set; }

        [JsonPropertyName("telephone")]
        [JsonRequired]
        public string Telephone { get; set; }

        [JsonPropertyName("mobile")]
        public string Mobile { get; set; }

        [JsonPropertyName("address1")]
        [JsonRequired]
        public string Address1 { get; set; }

        [JsonPropertyName("address2")]
        public string Address2 { get; set; }

        [JsonPropertyName("address3")]
        public string Address3 { get; set; }

        [JsonPropertyName("postcode")]
        [JsonRequired]
        public string Postcode { get; set; }

        [JsonPropertyName("city")]
        [JsonRequired]
        public string City { get; set; }

        [JsonPropertyName("country")]
        [JsonRequired]
        public CountryEnum Country { get; set; }

        [JsonPropertyName("state")]
        public string State { get; set; }

        [JsonPropertyName("vat")]
        public string Vat { get; set; }

        [JsonPropertyName("taxOffice")]
        public string TaxOffice { get; set; }

    }
}
