# frozen_string_literal: true

# Represents the UnitDto DTO.
class UnitDto
  # @!attribute [rw] id
  #   @return [String]
  # @!attribute [rw] unit_description
  #   @return [String]
  # @!attribute [rw] interval_description
  #   @return [String]
    attr_accessor :id
    attr_accessor :unit_description
    attr_accessor :interval_description

  # Initializes a new instance of the UnitDto class.
  # @param [Hash] args
  def initialize(id: nil, unit_description: nil, interval_description: nil)
      @id = id
      @unit_description = unit_description
      @interval_description = interval_description
  end
end
