import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductUpgradeableRequestDto } from '../dtos/product/requests/product-upgradeable-request.dto';

/**
 * Validates a product upgradeable request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductUpgradeableRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductUpgradeableRequestDto, plainObject);
  return await validate(request);
};
