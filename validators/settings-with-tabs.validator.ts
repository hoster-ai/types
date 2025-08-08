import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SettingsWithTabsDto } from '../dtos/settings.dto';
import { ValidationError } from 'class-validator';

export function validateSettingsWithTabsDto(data: object): ValidationError[] {
    const dto = plainToInstance(SettingsWithTabsDto, data);
    const errors = validateSync(dto);
    return errors;
}