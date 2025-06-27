import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductValidateAttributesRequestDto } from '../dtos/product/requests/product-validate-attributes-request.dto';

/**
 * Validates a product validate attributes request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductValidateAttributesRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(
    ProductValidateAttributesRequestDto,
    plainObject,
  );
  return await validate(request);
};
