import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductDowngradeResponseDto } from '../dtos/product/responses/product-downgrade-response.dto';

/**
 * Validates a product downgrade response object.
 *
 * The core needs this for the deferred hook: that hook's request body IS this
 * response DTO, and a NestJS ValidationPipe cannot validate it (the fields carry
 * only `@JSONSchema`). Issue #27.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductDowngradeResponseDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const response = plainToInstance(ProductDowngradeResponseDto, plainObject);
  return await validate(response, { skipMissingProperties: true });
};
