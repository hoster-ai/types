# frozen_string_literal: true

# Represents the InfoNotificationDto DTO.
class InfoNotificationDto
  # @!attribute [rw] type
  #   @return [MessageTypeEnum]
    attr_accessor :type

  # Initializes a new instance of the InfoNotificationDto class.
  # @param [Hash] args
  def initialize(type: nil)
      @type = type
  end
end
