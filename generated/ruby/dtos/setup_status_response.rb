# frozen_string_literal: true

# Represents the SetupStatusResponseDto DTO.
class SetupStatusResponseDto
  # @!attribute [rw] status
  #   @return [SetupStatusEnum]
    attr_accessor :status

  # Initializes a new instance of the SetupStatusResponseDto class.
  # @param [Hash] args
  def initialize(status: nil)
      @status = status
  end
end
