import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ProductCreateResponseDto } from '../dtos/product/responses/product-create-response.dto';

/**
 * Validates a product create response object.
 *
 * The core needs this for the deferred hook: that hook's request body IS this
 * response DTO, and a NestJS ValidationPipe cannot validate it (the fields carry
 * only `@JSONSchema`). Issue #27.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateProductCreateResponseDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const response = plainToInstance(ProductCreateResponseDto, plainObject);
  return await validate(response, { skipMissingProperties: true });
};
