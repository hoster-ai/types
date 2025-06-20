# frozen_string_literal: true

# Represents the ErrorResponseDto DTO.
class ErrorResponseDto
  # @!attribute [rw] code
  #   @return [String]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] errors
  #   @return [[Array<String>, String]]
    attr_accessor :code
    attr_accessor :each
    attr_accessor :errors

  # Initializes a new instance of the ErrorResponseDto class.
  # @param [Hash] args
  def initialize(code: nil, each: nil, errors: nil)
      @code = code
      @each = each
      @errors = errors
  end
end
