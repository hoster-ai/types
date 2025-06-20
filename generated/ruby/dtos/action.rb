# frozen_string_literal: true

# Represents the ActionDto DTO.
class ActionDto
  # @!attribute [rw] icon
  #   @return [String]
  # @!attribute [rw] label
  #   @return [String]
  # @!attribute [rw] open_method
  #   @return [OpenMethodEnum]
  # @!attribute [rw] url
  #   @return [String]
    attr_accessor :icon
    attr_accessor :label
    attr_accessor :open_method
    attr_accessor :url

  # Initializes a new instance of the ActionDto class.
  # @param [Hash] args
  def initialize(icon: nil, label: nil, open_method: nil, url: nil)
      @icon = icon
      @label = label
      @open_method = open_method
      @url = url
  end
end
