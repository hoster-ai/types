# frozen_string_literal: true

# Represents the CompanyDataDto DTO.
class CompanyDataDto
  # @!attribute [rw] id
  #   @return [String]
  # @!attribute [rw] name
  #   @return [String]
  # @!attribute [rw] emails
  #   @return [Array<String>]
  # @!attribute [rw] invoice_email
  #   @return [String]
  # @!attribute [rw] privacy_policy_url
  #   @return [String]
  # @!attribute [rw] default_language
  #   @return [LanguageEnum]
  # @!attribute [rw] languages
  #   @return [Array<LanguageEnum>]
  # @!attribute [rw] telephone
  #   @return [String]
  # @!attribute [rw] mobile
  #   @return [String]
  # @!attribute [rw] address1
  #   @return [String]
  # @!attribute [rw] address2
  #   @return [String]
  # @!attribute [rw] address3
  #   @return [String]
  # @!attribute [rw] postcode
  #   @return [String]
  # @!attribute [rw] city
  #   @return [String]
  # @!attribute [rw] country
  #   @return [CountryEnum]
  # @!attribute [rw] state
  #   @return [String]
  # @!attribute [rw] vat
  #   @return [String]
  # @!attribute [rw] tax_office
  #   @return [String]
    attr_accessor :id
    attr_accessor :name
    attr_accessor :emails
    attr_accessor :invoice_email
    attr_accessor :privacy_policy_url
    attr_accessor :default_language
    attr_accessor :languages
    attr_accessor :telephone
    attr_accessor :mobile
    attr_accessor :address1
    attr_accessor :address2
    attr_accessor :address3
    attr_accessor :postcode
    attr_accessor :city
    attr_accessor :country
    attr_accessor :state
    attr_accessor :vat
    attr_accessor :tax_office

  # Initializes a new instance of the CompanyDataDto class.
  # @param [Hash] args
  def initialize(id: nil, name: nil, emails: nil, invoice_email: nil, privacy_policy_url: nil, default_language: nil, languages: nil, telephone: nil, mobile: nil, address1: nil, address2: nil, address3: nil, postcode: nil, city: nil, country: nil, state: nil, vat: nil, tax_office: nil)
      @id = id
      @name = name
      @emails = emails
      @invoice_email = invoice_email
      @privacy_policy_url = privacy_policy_url
      @default_language = default_language
      @languages = languages
      @telephone = telephone
      @mobile = mobile
      @address1 = address1
      @address2 = address2
      @address3 = address3
      @postcode = postcode
      @city = city
      @country = country
      @state = state
      @vat = vat
      @tax_office = tax_office
  end
end
