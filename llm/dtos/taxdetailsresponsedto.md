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
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { VatTreatmentEnum } from '../../../enums/invoice/vat-treatment.enum';
import { requiresExemptionReason } from '../../../helpers/vat-treatment.helper';
import { BaseResponse } from '../../base-response.dto';
import { TINValidationDetails } from '../tin-validation-details.dto';
import { MaxDecimalPlaces } from '../../../decorators/max-decimal-places.validator';

/**
 * Represents the response containing tax calculation details.
 * The tax integration is the source of the VAT: rate, treatment and, for a 0%
 * rate outside `domestic`, the reason no VAT is charged.
 */
export class TaxDetailsResponseDto extends BaseResponse {
  /**
   * Whether the buyer's VAT number is valid. Absent when the request carried no
   * VAT number.
   */
  @IsOptional()
  @IsBoolean()
  @JSONSchema({
    title: 'VAT Number Valid',
    description:
      "Whether the buyer's VAT number is valid. Absent when the request carried no VAT number.",
    type: 'boolean',
  })
  vatNumberValid?: boolean;

  /**
   * The applicable VAT rate, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsDefined()
  @IsNumber()
  @MaxDecimalPlaces(2)
  @Min(0)
  @Max(100)
  @JSONSchema({
    title: 'VAT Rate',
    description:
      'The applicable VAT rate as a percentage (e.g. 24 for 24%), 0-100, up to two decimal places.',
    type: 'number',
    minimum: 0,
    maximum: 100,
  })
  vatRate!: number;

  /**
   * How VAT applies to this sale.
   */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @JSONSchema({
    title: 'Treatment',
    description: 'How VAT applies to this sale.',
    $ref: '#/components/schemas/VatTreatmentEnum',
  })
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged. Required when `vatRate` is 0 and `treatment` is not
   * `domestic`.
   */
  @ValidateIf(
    (response: TaxDetailsResponseDto) =>
      requiresExemptionReason(response) || response.exemptionReason != null,
  )
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Exemption Reason',
    description:
      'Why no VAT is charged (e.g. the legal reference printed on the invoice). Required when vatRate is 0 and treatment is not domestic.',
    type: 'string',
  })
  exemptionReason?: string;

  /**
   * Detailed tax validation information including company details
   */
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TINValidationDetails)
  @JSONSchema({
    title: 'Tax Details',
    description:
      'Detailed tax validation information including company details.',
    $ref: '#/components/schemas/TINValidationDetails',
  })
  taxDetails?: TINValidationDetails;
}
```
