# InvoiceInfoDto

**Description:** Invoice integration information. Extends base integration info with invoice-specific configuration.

**Source:** `dtos/invoice/invoice-info.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
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
  @IsDefined()
  @IsArray()
  @IsEnum(CountryEnum, { each: true })
  @ArrayMinSize(1)
  @JSONSchema({
    title: 'Supported Countries',
    description: 'Countries supported by this invoice integration.',
    type: 'array',
    items: { $ref: '#/components/schemas/CountryEnum' },
    example: ['GR'],
  })
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
    items: { $ref: '#/components/schemas/InvoiceTypesEnum' },
  })
  supportedTypes: InvoiceTypesEnum[] = [];
}
```
