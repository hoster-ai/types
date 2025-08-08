import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ClientPanelDto } from '../dtos/client-panel.dto';

export async function validateClientPanelDto(data: object): Promise<ValidationError[]> {
    const dto = plainToInstance(ClientPanelDto, data);
    const errors = await validate(dto, {
        whitelist: true,              
        forbidNonWhitelisted: true,    
      });
    return errors;
}