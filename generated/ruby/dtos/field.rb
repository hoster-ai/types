# frozen_string_literal: true

# Represents the FieldDto DTO.
class FieldDto
  # @!attribute [rw] id
  #   @return [String]
  # @!attribute [rw] label
  #   @return [Array<MultilangTextDto>]
  # @!attribute [rw] value
  #   @return [[String, Float, Hash{String => Object}]]
  # @!attribute [rw] type
  #   @return [FieldTypeEnum]
  # @!attribute [rw] required
  #   @return [Boolean]
  # @!attribute [rw] disabled
  #   @return [Boolean]
  # @!attribute [rw] hidden
  #   @return [Boolean]
  # @!attribute [rw] regex_validation
  #   @return [String]
  # @!attribute [rw] regex_validation_error_message
  #   @return [Array<MultilangTextDto>]
  # @!attribute [rw] remote_validation
  #   @return [Boolean]
  # @!attribute [rw] remote_validation_error_message
  #   @return [Array<MultilangTextDto>]
    attr_accessor :id
    attr_accessor :label
    attr_accessor :value
    attr_accessor :type
    attr_accessor :required
    attr_accessor :disabled
    attr_accessor :hidden
    attr_accessor :regex_validation
    attr_accessor :regex_validation_error_message
    attr_accessor :remote_validation
    attr_accessor :remote_validation_error_message

  # Initializes a new instance of the FieldDto class.
  # @param [Hash] args
  def initialize(id: nil, label: nil, value: nil, type: nil, required: nil, disabled: nil, hidden: nil, regex_validation: nil, regex_validation_error_message: nil, remote_validation: nil, remote_validation_error_message: nil)
      @id = id
      @label = label
      @value = value
      @type = type
      @required = required
      @disabled = disabled
      @hidden = hidden
      @regex_validation = regex_validation
      @regex_validation_error_message = regex_validation_error_message
      @remote_validation = remote_validation
      @remote_validation_error_message = remote_validation_error_message
  end
end
