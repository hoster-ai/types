import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ClientDataDto } from '../dtos/client-data.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

/**
 * Validates a client data object.
 *
 * @param {Record<string, unknown>} plainObject - The plain object to validate.
 * @returns {Promise<ValidationError[]>} - A promise that resolves with an array of validation errors.
 */
export const validateClientDataDto = async (
  plainObject: Record<string, unknown>,
): Promise<ValidationError[]> => {
  const clientData = plainToInstance(ClientDataDto, plainObject);
  return await validate(clientData, STRICT_VALIDATION_OPTIONS);
};
