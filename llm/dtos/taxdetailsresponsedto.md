# TaxDetailsResponseDto

**Description:** Represents the response containing tax calculation details. Includes VAT rate and optional TIN validation information.

**Source:** `dtos/invoice/responses/tax-details-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import { IsBoolean, IsDefined, IsNumber, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseResponse } from '../../base-response.dto';
import { TINValidationDetails } from '../tin-validation-details.dto';

/**
 * Represents the response containing tax calculation details.
 * Includes VAT rate and optional TIN validation information.
 */
export class TaxDetailsResponseDto extends BaseResponse {
  /**
   * The applicable VAT rate for the transaction
   */
  @IsDefined()
  @IsNumber()
  @JSONSchema({
    title: 'VAT Rate',
    description: 'The applicable VAT rate for the transaction.',
    type: 'number',
  })
  vatRate!: number;

  /**
   * Indicates whether the Tax Identification Number is valid
   */
  @IsOptional()
  @IsBoolean()
  @JSONSchema({
    title: 'TIN Valid',
    description: 'Whether the Tax Identification Number is valid.',
    type: 'boolean',
  })
  TINValid?: boolean;

  /**
   * Detailed tax validation information including company details
   */
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TINValidationDetails)
  @JSONSchema({
    title: 'Tax Details',
    description: 'Detailed tax validation information including company details.',
    $ref: '#/components/schemas/TINValidationDetails',
  })
  taxDetails?: TINValidationDetails;
}
```

