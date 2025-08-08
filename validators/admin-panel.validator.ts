import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdminPanelDto } from '../dtos/admin-panel.dto';

export async function validateAdminPanelDto(data: object): Promise<ValidationError[]> {
    const dto = plainToInstance(AdminPanelDto, data);
    const errors = await validate(dto, {
        whitelist: true,               // strips unknown props
        forbidNonWhitelisted: true,    // throws error if unknown props present
      });
    return errors;
}