import { IsString, IsUrl, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { TabDto } from './tab.dto';
import { IsDefined } from 'class-validator';
import { IsPropertyForbidden } from '../decorators/is-property-forbidden.validator';

export class SettingsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  label!: string;

  @IsString()
  @IsDefined()
  icon!: string;

  @IsString()
  @IsDefined()
  description!: string;
}

export class SettingsWithUrlDto extends SettingsDto {
  @IsUrl({ protocols: ['https'], require_protocol: true })
  url!: string;

  @IsPropertyForbidden('tabs')
  tabs?: never;
}

export class SettingsWithTabsDto extends SettingsDto {
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  tabs!: [TabDto, ...TabDto[]];

  @IsPropertyForbidden('url')
  url?: never;
}
