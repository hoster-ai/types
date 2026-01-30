# transformSettings

**Description:** Transformer function that converts plain objects to SettingsWithUrlDto or SettingsWithTabsDto based on the presence of url or tabs properties.

**Source:** `transformers/settings.transformer.ts`

**Language:** typescript

## Code

```typescript
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
```

----------------------------------------}
```

