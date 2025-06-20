# frozen_string_literal: true

# Represents the SmsReceiverDto DTO.
class SmsReceiverDto
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] receiver_phones
  #   @return [Array<String>]
    attr_accessor :each
    attr_accessor :receiver_phones

  # Initializes a new instance of the SmsReceiverDto class.
  # @param [Hash] args
  def initialize(each: nil, receiver_phones: nil)
      @each = each
      @receiver_phones = receiver_phones
  end
end
