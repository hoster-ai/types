import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { JwtDto } from '../dtos/jwt.dto';

/**
 * Validates a JwtDto object using class-validator decorators.
 *
 * @param data The object to validate as a JwtDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateJwtDto(data: object): ValidationError[] {
  const dto = plainToInstance(JwtDto, data);
  const errors = validateSync(dto);
  
  return errors;
}
