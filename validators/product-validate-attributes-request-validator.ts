import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ValidateAttributesRequestDto } from '../dtos/requests/validate-attributes-request.dto';

/**
 * Validates a product validate attributes request object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateValidateAttributesRequestDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const request = plainToInstance(
    ValidateAttributesRequestDto,
    plainObject,
  );
  return await validate(request);
};
