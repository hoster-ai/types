import { plainToInstance } from 'class-transformer';
import { MenuDtoWithUrl, MenuDtoWithSubmenu, BaseMenuDto } from '../dtos/menu.dto';

export function transformMenu(value: any): MenuDtoWithUrl | MenuDtoWithSubmenu | BaseMenuDto | undefined {
  if (!value) return undefined;
  if (value.type === 'only-url') {
    return plainToInstance(MenuDtoWithUrl, value);
  } else if (value.type === 'with-submenu') {
    return plainToInstance(MenuDtoWithSubmenu, value);
  }
  return plainToInstance(BaseMenuDto, value)
}