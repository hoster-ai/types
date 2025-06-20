# frozen_string_literal: true

# Represents the RequestDto DTO.
class RequestDto
  # @!attribute [rw] notification_id
  #   @return [String]
  # @!attribute [rw] sender
  #   @return [[EmailSenderDto, SmsSenderDto, PushSenderDto]]
  # @!attribute [rw] receiver
  #   @return [[EmailReceiverDto, SmsReceiverDto, PushReceiverDto]]
    attr_accessor :notification_id
    attr_accessor :sender
    attr_accessor :receiver

  # Initializes a new instance of the RequestDto class.
  # @param [Hash] args
  def initialize(notification_id: nil, sender: nil, receiver: nil)
      @notification_id = notification_id
      @sender = sender
      @receiver = receiver
  end
end
