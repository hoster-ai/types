# frozen_string_literal: true

# Represents the PushSenderDto DTO.
class PushSenderDto
  # @!attribute [rw] message_id
  #   @return [String]
  # @!attribute [rw] user_id
  #   @return [String]
  # @!attribute [rw] title
  #   @return [String]
  # @!attribute [rw] message
  #   @return [String]
  # @!attribute [rw] subtitle
  #   @return [String]
    attr_accessor :message_id
    attr_accessor :user_id
    attr_accessor :title
    attr_accessor :message
    attr_accessor :subtitle

  # Initializes a new instance of the PushSenderDto class.
  # @param [Hash] args
  def initialize(message_id: nil, user_id: nil, title: nil, message: nil, subtitle: nil)
      @message_id = message_id
      @user_id = user_id
      @title = title
      @message = message
      @subtitle = subtitle
  end
end
