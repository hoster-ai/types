# frozen_string_literal: true

# Represents the InfoDto DTO.
class InfoDto
  # @!attribute [rw] label
  #   @return [String]
  # @!attribute [rw] url
  #   @return [String]
  # @!attribute [rw] icon
  #   @return [String]
  # @!attribute [rw] label
  #   @return [String]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] tabs
  #   @return [Array<TabDto>]
  # @!attribute [rw] title
  #   @return [String]
  # @!attribute [rw] logo
  #   @return [String]
  # @!attribute [rw] description
  #   @return [String]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] supported_languages
  #   @return [Array<LanguageEnum>]
  # @!attribute [rw] product_attributes
  #   @return [Array<FieldDto>]
  # @!attribute [rw] item_attributes
  #   @return [Array<FieldDto>]
  # @!attribute [rw] listen_events
  #   @return [Array<EventsEnum>]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] required_roles
  #   @return [Array<RolesEnum>]
  # @!attribute [rw] unsupported_actions
  #   @return [Array<ActionsEnum>]
  # @!attribute [rw] admin_panel
  #   @return [{]
  # @!attribute [rw] product_tabs
  #   @return [Array<TabDto>]
  # @!attribute [rw] actions
  #   @return [{]
  # @!attribute [rw] client
  #   @return [Array<ActionDto>]
  # @!attribute [rw] item
  #   @return [Array<ActionDto>]
  # @!attribute [rw] menu
  #   @return [MenuDto]
  # @!attribute [rw] settings
  #   @return [MenuDto]
  # @!attribute [rw] client_panel
  #   @return [{]
  # @!attribute [rw] product_tabs
  #   @return [Array<TabDto>]
  # @!attribute [rw] actions
  #   @return [{]
  # @!attribute [rw] item
  #   @return [Array<ActionDto>]
  # @!attribute [rw] menu
  #   @return [MenuDto]
  # @!attribute [rw] onboarding_url
  #   @return [String]
  # @!attribute [rw] pay_per_use_units
  #   @return [Array<UnitDto>]
  # @!attribute [rw] response_data_field_names
  #   @return [Hash{keyof ResponseDataDto => String}]
    attr_accessor :label
    attr_accessor :url
    attr_accessor :icon
    attr_accessor :label
    attr_accessor :each
    attr_accessor :tabs
    attr_accessor :title
    attr_accessor :logo
    attr_accessor :description
    attr_accessor :each
    attr_accessor :supported_languages
    attr_accessor :product_attributes
    attr_accessor :item_attributes
    attr_accessor :listen_events
    attr_accessor :each
    attr_accessor :required_roles
    attr_accessor :unsupported_actions
    attr_accessor :admin_panel
    attr_accessor :product_tabs
    attr_accessor :actions
    attr_accessor :client
    attr_accessor :item
    attr_accessor :menu
    attr_accessor :settings
    attr_accessor :client_panel
    attr_accessor :product_tabs
    attr_accessor :actions
    attr_accessor :item
    attr_accessor :menu
    attr_accessor :onboarding_url
    attr_accessor :pay_per_use_units
    attr_accessor :response_data_field_names

  # Initializes a new instance of the InfoDto class.
  # @param [Hash] args
  def initialize(label: nil, url: nil, icon: nil, label: nil, each: nil, tabs: nil, title: nil, logo: nil, description: nil, each: nil, supported_languages: nil, product_attributes: nil, item_attributes: nil, listen_events: nil, each: nil, required_roles: nil, unsupported_actions: [], admin_panel: nil, product_tabs: nil, actions: nil, client: nil, item: nil, menu: nil, settings: nil, client_panel: nil, product_tabs: nil, actions: nil, item: nil, menu: nil, onboarding_url: nil, pay_per_use_units: nil, response_data_field_names: nil)
      @label = label
      @url = url
      @icon = icon
      @label = label
      @each = each
      @tabs = tabs
      @title = title
      @logo = logo
      @description = description
      @each = each
      @supported_languages = supported_languages
      @product_attributes = product_attributes
      @item_attributes = item_attributes
      @listen_events = listen_events
      @each = each
      @required_roles = required_roles
      @unsupported_actions = unsupported_actions
      @admin_panel = admin_panel
      @product_tabs = product_tabs
      @actions = actions
      @client = client
      @item = item
      @menu = menu
      @settings = settings
      @client_panel = client_panel
      @product_tabs = product_tabs
      @actions = actions
      @item = item
      @menu = menu
      @onboarding_url = onboarding_url
      @pay_per_use_units = pay_per_use_units
      @response_data_field_names = response_data_field_names
  end
end
