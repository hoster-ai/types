# frozen_string_literal: true

# Represents the EmailReceiverDto DTO.
class EmailReceiverDto
  # @!attribute [rw] to
  #   @return [String]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] cc
  #   @return [Array<String>]
  # @!attribute [rw] each
  #   @return [true })]
  # @!attribute [rw] bcc
  #   @return [Array<String>]
    attr_accessor :to
    attr_accessor :each
    attr_accessor :cc
    attr_accessor :each
    attr_accessor :bcc

  # Initializes a new instance of the EmailReceiverDto class.
  # @param [Hash] args
  def initialize(to: nil, each: nil, cc: nil, each: nil, bcc: nil)
      @to = to
      @each = each
      @cc = cc
      @each = each
      @bcc = bcc
  end
end
