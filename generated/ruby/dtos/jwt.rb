# frozen_string_literal: true

# Represents the JwtDto DTO.
class JwtDto
  # @!attribute [rw] jwt
  #   @return [{]
  # @!attribute [rw] integration_id
  #   @return [String]
  # @!attribute [rw] user_id
  #   @return [String]
  # @!attribute [rw] company_id
  #   @return [String]
  # @!attribute [rw] accepted_roles
  #   @return [Array<RolesEnum>]
    attr_accessor :jwt
    attr_accessor :integration_id
    attr_accessor :user_id
    attr_accessor :company_id
    attr_accessor :accepted_roles

  # Initializes a new instance of the JwtDto class.
  # @param [Hash] args
  def initialize(jwt: nil, integration_id: nil, user_id: nil, company_id: nil, accepted_roles: nil)
      @jwt = jwt
      @integration_id = integration_id
      @user_id = user_id
      @company_id = company_id
      @accepted_roles = accepted_roles
  end
end
