import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductUpgradableRequestDto } from '../dtos/product/requests/product-upgradable-request.dto';

/**
 * Validates a product upgradable request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductUpgradableRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductUpgradableRequestDto, plainObject);
  return await validate(request);
};
