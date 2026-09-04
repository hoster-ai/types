import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductUnsuspendResponseDto } from '../dtos/product/responses/product-unsuspend-response.dto';

/**
 * Validates a product unsuspend response object.
 *
 * The core needs this for the deferred hook: that hook's request body IS this
 * response DTO. Nothing is skipped: `status` and `outboxId` are what let the core settle and
 * correlate the report, so a report without them is unusable. Issue #27.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductUnsuspendResponseDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const response = plainToInstance(ProductUnsuspendResponseDto, plainObject);
  return await validate(response);
};
