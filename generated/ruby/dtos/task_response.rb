# frozen_string_literal: true

# Represents the TaskResponseDto DTO.
class TaskResponseDto
  # @!attribute [rw] task_id
  #   @return [String]
    attr_accessor :task_id

  # Initializes a new instance of the TaskResponseDto class.
  # @param [Hash] args
  def initialize(task_id: nil)
      @task_id = task_id
  end
end
