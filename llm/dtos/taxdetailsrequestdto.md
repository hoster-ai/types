# TaxDetailsRequestDto

**Description:** Request payload for calculating tax details. The core sends the seller and buyer facts (seller country, buyer country, VAT number, postal code, B2B flag, card-issuing country); the tax integration decides the VAT rate and treatment.

**Source:** `dtos/tax-manager/tax-details-request.dto.ts`

**Language:** typescript

## Code

```typescript
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { CountryEnum } from '../../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Request payload for calculating tax details.
 * The core sends the seller and buyer facts; the tax integration decides the VAT
 * rate and treatment (`TaxDetailsResponseDto`).
 */
export class TaxDetailsRequestDto {
  /**
   * Country of the seller — the company's country, verified by KYC. Always one
   * of the integration's `supportedCountries`.
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Seller Country',
    description:
      "Country of the seller: the company's country, verified by KYC. Always one of the integration's supportedCountries.",
    $ref: '#/components/schemas/CountryEnum',
  })
  sellerCountry!: CountryEnum;

  /**
   * Country of the buyer, from the client's invoice contact.
   */
  @IsDefined()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Buyer Country',
    description: "Country of the buyer, from the client's invoice contact.",
    $ref: '#/components/schemas/CountryEnum',
  })
  buyerCountry!: CountryEnum;

  /**
   * VAT number / TIN of the buyer. Absent when the buyer has none.
   */
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Buyer VAT Number',
    description:
      'VAT number / TIN of the buyer. Absent when the buyer has none.',
    type: 'string',
  })
  buyerVatNumber?: string;

  /**
   * Postal code of the buyer. Some countries have VAT-exempt regions that only
   * the postal code reveals.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Buyer Postal Code',
    description:
      'Postal code of the buyer. Some countries have regions with special VAT rules that only the postal code reveals.',
    type: 'string',
  })
  buyerPostalCode?: string;

  /**
   * State or province of the buyer.
   */
  @IsOptional()
  @IsString()
  @JSONSchema({
    title: 'Buyer State',
    description: 'State or province of the buyer.',
    type: 'string',
  })
  buyerState?: string;

  /**
   * Whether the buyer's invoice contact is a business (B2B) rather than a
   * consumer (B2C).
   */
  @IsDefined()
  @IsBoolean()
  @JSONSchema({
    title: 'Is Business Contact',
    description:
      "Whether the buyer's invoice contact is a business (B2B) rather than a consumer (B2C).",
    type: 'boolean',
  })
  isBusinessContact!: boolean;

  /**
   * Country that issued the payment card, as reported by the payment provider.
   * A second piece of evidence of the buyer's location for OSS.
   */
  @IsOptional()
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Payment Country',
    description:
      "Country that issued the payment card, as reported by the payment provider. A second piece of evidence of the buyer's location for OSS.",
    $ref: '#/components/schemas/CountryEnum',
  })
  paymentCountry?: CountryEnum;
}
```
