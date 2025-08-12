import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { MenuDtoWithUrl } from '../dtos/menu.dto';
import { ValidationError } from 'class-validator';

export function validateMenuWithUrlDto(data: object): ValidationError[] {
    const dto = plainToInstance(MenuDtoWithUrl, data);
    const errors = validateSync(dto);
    return errors;
}