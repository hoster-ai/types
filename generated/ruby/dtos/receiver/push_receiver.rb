# frozen_string_literal: true

# Represents the PushReceiverDto DTO.
class PushReceiverDto
  # @!attribute [rw] user_id
  #   @return [String]
  # @!attribute [rw] device_tokens
  #   @return [Array<String>]
    attr_accessor :user_id
    attr_accessor :device_tokens

  # Initializes a new instance of the PushReceiverDto class.
  # @param [Hash] args
  def initialize(user_id: nil, device_tokens: nil)
      @user_id = user_id
      @device_tokens = device_tokens
  end
end
