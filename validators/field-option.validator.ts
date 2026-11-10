import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FieldOptionDto } from '../dtos/field-option.dto';
import { STRICT_VALIDATION_OPTIONS } from './validation-options';

export function validateFieldOptionDto(data: object): ValidationError[] {
  const dto = plainToInstance(FieldOptionDto, data);
  const errors = validateSync(dto, STRICT_VALIDATION_OPTIONS);

  return errors;
}
