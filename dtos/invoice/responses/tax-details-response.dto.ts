import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
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
  @JSONSchema({
    title: 'VAT Number Valid',
    description:
      "Whether the buyer's VAT number is valid. Absent when the request carried no VAT number. treatment reverse_charge requires true.",
    type: 'boolean',
  })
  vatNumberValid?: boolean;

  /**
   * The applicable VAT rate, as a percentage (e.g. 24 for 24%), 0–100, up to two
   * decimal places.
   */
  @IsVatRate()
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
   * How VAT applies to this sale. `reverse_charge`, `outside_scope` and `exempt`
   * charge no VAT, so they come with `vatRate` 0; `reverse_charge` also needs
   * `vatNumberValid: true`.
   */
  @IsDefined()
  @IsEnum(VatTreatmentEnum)
  @MatchesVatTreatment({ requireValidVatNumber: true })
  @JSONSchema({
    title: 'Treatment',
    description:
      'How VAT applies to this sale. reverse_charge, outside_scope and exempt charge no VAT, so they come with vatRate 0; reverse_charge also needs vatNumberValid: true.',
    $ref: '#/components/schemas/VatTreatmentEnum',
  })
  treatment!: VatTreatmentEnum;

  /**
   * Why no VAT is charged. Required when `vatRate` is 0 and `treatment` is not
   * `domestic`: then non-blank, at most 500 characters. Absent or null
   * elsewhere.
   */
  @IsExemptionReason()
  @JSONSchema({
    title: 'Exemption Reason',
    description:
      'Why no VAT is charged (e.g. the legal reference printed on the invoice). Required when vatRate is 0 and treatment is not domestic: then non-blank, at most 500 characters. Absent or null elsewhere.',
    type: 'string',
    nullable: true,
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
