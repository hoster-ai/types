# frozen_string_literal: true

# Represents the SmsSenderDto DTO.
class SmsSenderDto
  # @!attribute [rw] sender_phone
  #   @return [String]
  # @!attribute [rw] message
  #   @return [String]
    attr_accessor :sender_phone
    attr_accessor :message

  # Initializes a new instance of the SmsSenderDto class.
  # @param [Hash] args
  def initialize(sender_phone: nil, message: nil)
      @sender_phone = sender_phone
      @message = message
  end
end
