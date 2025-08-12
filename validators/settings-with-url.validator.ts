import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SettingsWithUrlDto } from '../dtos/settings.dto';
import { ValidationError } from 'class-validator';

export function validateSettingsWithUrlDto(data: object): ValidationError[] {
    const dto = plainToInstance(SettingsWithUrlDto, data);
    const errors = validateSync(dto);
    return errors;
}