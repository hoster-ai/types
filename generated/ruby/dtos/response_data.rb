# frozen_string_literal: true

# Represents the ResponseDataDto DTO.
class ResponseDataDto
  # @!attribute [rw] key
  #   @return [string]: any]
    attr_accessor :key

  # Initializes a new instance of the ResponseDataDto class.
  # @param [Hash] args
  def initialize(key: nil)
      @key = key
  end
end
