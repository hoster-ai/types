import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductUpgradeRequestDto } from '../dtos/product/requests/product-upgrade-request.dto';

/**
 * Validates a product upgrade request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductUpgradeRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductUpgradeRequestDto, plainObject);
  return await validate(request);
};
