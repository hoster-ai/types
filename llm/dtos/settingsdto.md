# SettingsDto

**Description:** Base settings DTO and its two variants for URL or Tabs. Uses custom @IsPropertyForbidden to forbid incompatible properties.

**Source:** `dtos/settings.dto.ts`

**Exports:** `SettingsDto`, `SettingsWithUrlDto`, `SettingsWithTabsDto`

**Language:** typescript

## Code

```typescript
import { IsString, IsUrl, ValidateNested, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { TabDto } from './tab.dto';
import { IsDefined } from 'class-validator';
import { IsPropertyForbidden } from '../decorators/is-property-forbidden.validator';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Base settings properties shared by all settings variants.
 */
export class SettingsDto {
  /** Label of the settings page */
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Label',
    description: 'Label of the settings page.',
    type: 'string',
  })
  label!: string;

  /** Icon of the settings page */
  @IsString()
  @IsDefined()
  @JSONSchema({
    title: 'Icon',
    description: 'Icon of the settings page.',
    type: 'string',
  })
  icon!: string;

  /** Description of the settings page */
  @IsString()
  @IsDefined()
  @JSONSchema({
    title: 'Description',
    description: 'Description of the settings page.',
    type: 'string',
  })
  description!: string;
}

/**
 * Settings configuration with a direct URL.
 * Used when the settings page is a single URL without tabs.
 */
export class SettingsWithUrlDto extends SettingsDto {
  /** URL to the settings page */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @JSONSchema({
    title: 'URL',
    description: 'URL to the settings page.',
    type: 'string',
    format: 'url',
  })
  url!: string;

  /** Explicitly prevents tabs from being added to this variant */
  @IsPropertyForbidden('tabs')
  tabs?: never;
}

/**
 * Settings configuration with multiple tabs.
 * Used when the settings page has multiple sections organized as tabs.
 */
export class SettingsWithTabsDto extends SettingsDto {
  /** List of tabs for the settings page */
  @ValidateNested({ each: true })
  @Type(() => TabDto)
  @JSONSchema({
    title: 'Tabs',
    description: 'List of tabs for the settings page.',
    type: 'array',
    items: { $ref: '#/components/schemas/TabDto' },
  })
  tabs!: [TabDto, ...TabDto[]];

  /** Explicitly prevents URL from being added to this variant */
  @IsPropertyForbidden('url')
  url?: never;
}
```

