// Auto-generated from TypeScript
package com.hoster.contracts.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

/**
 * CompanyDataDto Data Transfer Object
 */
@Data
public class CompanyDataDto {

    @JsonProperty("id")
    private String id;

    @JsonProperty("name")
    private String name;

    @JsonProperty("emails")
    private java.util.List<String> emails;

    @JsonProperty("invoiceEmail")
    private String invoiceEmail;

    @JsonProperty("privacyPolicyUrl")
    private String privacyPolicyUrl;

    @JsonProperty("defaultLanguage")
    private LanguageEnum defaultLanguage;

    @JsonProperty("languages")
    private java.util.List<LanguageEnum> languages;

    @JsonProperty("telephone")
    private String telephone;

    @JsonProperty("mobile")
    private String mobile;

    @JsonProperty("address1")
    private String address1;

    @JsonProperty("address2")
    private String address2;

    @JsonProperty("address3")
    private String address3;

    @JsonProperty("postcode")
    private String postcode;

    @JsonProperty("city")
    private String city;

    @JsonProperty("country")
    private CountryEnum country;

    @JsonProperty("state")
    private String state;

    @JsonProperty("vat")
    private String vat;

    @JsonProperty("taxOffice")
    private String taxOffice;

}
