import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CompanyDataDto } from '../dtos/company-data.dto';

/**
 * Validates a CompanyDataDto object using class-validator decorators.
 *
 * @param data The object to validate as a CompanyDataDto.
 * @returns An array of validation errors, empty if validation succeeds.
 */
export function validateCompanyDataDto(data: object): ValidationError[] {
  const dto = plainToInstance(CompanyDataDto, data);
  const errors = validateSync(dto);
  
  return errors;
}
