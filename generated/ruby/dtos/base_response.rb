# frozen_string_literal: true

# Represents the BaseResponse DTO.
class BaseResponse
  # @!attribute [rw] code
  #   @return [Float]
  # @!attribute [rw] message
  #   @return [String]
    attr_accessor :code
    attr_accessor :message

  # Initializes a new instance of the BaseResponse class.
  # @param [Hash] args
  def initialize(code: nil, message: nil)
      @code = code
      @message = message
  end
end
