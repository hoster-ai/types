import { IsString, IsUrl, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { TabDto } from './tab.dto';
import { IsDefined } from 'class-validator';
import { IsPropertyForbidden } from '../decorators/is-property-forbidden.validator';
import { JSONSchema } from 'class-validator-jsonschema';

export class SettingsDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Label',
    description: 'Label of the settings page.',
    type: 'string',
  })
  label!: string;

  @IsString()
  @IsDefined()
  @JSONSchema({
    title: 'Icon',
    description: 'Icon of the settings page.',
    type: 'string',
  })
  icon!: string;

  @IsString()
  @IsDefined()
  @JSONSchema({
    title: 'Description',
    description: 'Description of the settings page.',
    type: 'string',
  })
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
  @JSONSchema({
    title: 'Tabs',
    description: 'Tabs shown on the settings page.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' }
  })
  tabs!: [TabDto, ...TabDto[]];

  @IsPropertyForbidden('url')
  url?: never;
}
