# frozen_string_literal: true

# Represents the EmailSenderDto DTO.
class EmailSenderDto
  # @!attribute [rw] full_name
  #   @return [String]
  # @!attribute [rw] subject
  #   @return [String]
  # @!attribute [rw] message
  #   @return [String]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] attachments
  #   @return [Array<AttachmentDto>]
    attr_accessor :full_name
    attr_accessor :subject
    attr_accessor :message
    attr_accessor :each
    attr_accessor :attachments

  # Initializes a new instance of the EmailSenderDto class.
  # @param [Hash] args
  def initialize(full_name: nil, subject: nil, message: nil, each: nil, attachments: nil)
      @full_name = full_name
      @subject = subject
      @message = message
      @each = each
      @attachments = attachments
  end
end
