import { plainToInstance } from 'class-transformer';
import { SettingsWithUrlDto } from '../dtos/settings.dto';
import { SettingsWithTabsDto } from '../dtos/settings.dto';

export function transformSettings(value: any) {
  if (value?.tabs) {
    return plainToInstance(SettingsWithTabsDto, value);
  } else if (value?.url) {
    return plainToInstance(SettingsWithUrlDto, value);
  }
  return value;
}
