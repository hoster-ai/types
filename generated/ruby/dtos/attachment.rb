# frozen_string_literal: true

# Represents the AttachmentDto DTO.
class AttachmentDto
  # @!attribute [rw] filename
  #   @return [String]
  # @!attribute [rw] content
  #   @return [String]
  # @!attribute [rw] content_type
  #   @return [String]
    attr_accessor :filename
    attr_accessor :content
    attr_accessor :content_type

  # Initializes a new instance of the AttachmentDto class.
  # @param [Hash] args
  def initialize(filename: nil, content: nil, content_type: nil)
      @filename = filename
      @content = content
      @content_type = content_type
  end
end
