import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductDowngradeRequestDto } from '../dtos/product/requests/product-downgrade-request.dto';

/**
 * Validates a product downgrade request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductDowngradeRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductDowngradeRequestDto, plainObject);
  return await validate(request);
};
