import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductUnsuspendRequestDto } from '../dtos/product/requests/product-unsuspend-request.dto';

/**
 * Validates a product unsuspend request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductUnsuspendRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(ProductUnsuspendRequestDto, plainObject);
  return await validate(request);
};
