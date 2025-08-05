import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductDowngradableRequestDto } from '../dtos/product/requests/product-downgradable-request.dto';

/**
 * Validates a product downgradable request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductDowngradableRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductDowngradableRequestDto, plainObject);
  return await validate(request);
};
