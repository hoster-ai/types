import { IsDefined, IsObject, IsString } from 'class-validator';

/**
 * Represents a request to validate product attributes.
 * This DTO is used when a client needs to check the validity of a set of attribute values
 * before proceeding with an action, such as creating or updating a product.
 */
export class ProductValidateAttributesRequestDto {
  /**
   * The key of the attribute that triggered the validation.
   * This helps the server understand the context of the validation request,
   * especially in cases where validation rules are interdependent.
   */
  @IsDefined()
  @IsString()
  triggeredByKey!: string;

  /**
   * A record of attribute values to be validated.
   * The keys are the attribute identifiers, and the values are the data to be checked.
   */
  @IsDefined()
  @IsObject()
  values!: Record<string, unknown>;
}
