# TaxDetailsResponseDto

**Description:** Tax calculation answer of the tax integration: VAT rate (%), VatTreatmentEnum treatment, VAT number validity and, for a 0% rate outside domestic, the exemption reason.

**Source:** `dtos/invoice/responses/tax-details-response.dto.ts`

**Language:** typescript

## Code

```typescript
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { VatTreatmentEnum } from '../../../enums/invoice/vat-treatment.enum';
import { BaseResponse } from '../../base-response.dto';
import { TINValidationDetails } from '../tin-validation-details.dto';
import {
  IsExemptionReason,
  IsVatRate,
  MatchesVatTreatment,
} from '../../../decorators/vat-line.validator';

/**
 * Represents the response containing tax calculation details.
 * The tax integration is the source of the VAT: rate, treatment and, for a 0%
 * rate outside `domestic`, the reason no VAT is charged.
 */
export class TaxDetailsResponseDto extends BaseResponse {
  /**
   * Whether the buyer's VAT number is valid. Absent when the request carried no
   * VAT number. `reverse_charge` requires `true`.
   */
  @IsOptional()
  @IsBoolean()
  vatNumberValid?: boolean;

  /**
   * The applicable VAT rate, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsVatRate()
  vatRate!: number;

  /**
   * How VAT applies to this sale. `reverse_charge`, `outside_scope` and `exempt`
   * charge no VAT, so they come with `vatRate` 0; `reverse_charge` also needs
   * `vatNumberValid: true`.
   */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @MatchesVatTreatment({ requireValidVatNumber: true })
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged. Required when `vatRate` is 0 and `treatment` is not
   * `domestic`: then non-blank, at most 500 characters. Absent or null
   * elsewhere.
   */
  @IsExemptionReason()
  exemptionReason?: string;

  /**
   * Detailed tax validation information including company details
   */
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TINValidationDetails)
  taxDetails?: TINValidationDetails;
}
```
