import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { FieldOptionDto } from '../dtos/field-option.dto';

export function validateFieldOptionDto(data: object): ValidationError[] {
    const dto = plainToInstance(FieldOptionDto, data);
    const errors = validateSync(dto);

    return errors;
}