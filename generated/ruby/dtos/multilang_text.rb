# frozen_string_literal: true

# Represents the MultilangTextDto DTO.
class MultilangTextDto
  # @!attribute [rw] language
  #   @return [LanguageEnum]
  # @!attribute [rw] text
  #   @return [String]
    attr_accessor :language
    attr_accessor :text

  # Initializes a new instance of the MultilangTextDto class.
  # @param [Hash] args
  def initialize(language: nil, text: nil)
      @language = language
      @text = text
  end
end
