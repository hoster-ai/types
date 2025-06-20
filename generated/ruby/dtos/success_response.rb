# frozen_string_literal: true

# Represents the SuccessResponseDto DTO.
class SuccessResponseDto
  # @!attribute [rw] notification_id
  #   @return [String]
    attr_accessor :notification_id

  # Initializes a new instance of the SuccessResponseDto class.
  # @param [Hash] args
  def initialize(notification_id: nil)
      @notification_id = notification_id
  end
end
