# InvoiceInfoDto

**Description:** Invoice integration information. Extends base integration info with invoice-specific configuration.

**Source:** `dtos/invoice/invoice-info.dto.ts`

**Language:** typescript

## Code

```typescript
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { CountryEnum } from '../../enums/country.enum';
import { InfoDto } from '../info.dto';
import { InvoiceTypesEnum } from '../../enums/invoice/invoice-types.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Invoice integration information.
 * Extends base integration info with invoice-specific configuration.
 */
export class InvoiceInfoDto extends InfoDto {
  /** Countries supported by this invoice integration */
  supportedCountries!: CountryEnum[];

  /**
   * A list of actions that are supported by this integration.
   */
  @IsNotEmpty()
  @IsArray()
  @IsEnum(InvoiceTypesEnum, { each: true })
  @JSONSchema({
    title: 'Supported Types',
    description: 'Types of invoice supported by this integration.',
    type: 'array',
    items: { type: 'string', enum: Object.values(InvoiceTypesEnum) },
  })
  supportedTypes: InvoiceTypesEnum[] = [];
}
```
