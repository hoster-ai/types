import { Equals, IsArray, IsEnum, IsOptional } from 'class-validator';
import { JSONSchema } from 'class-validator-jsonschema';
import { BaseFieldDto } from '../base-field.dto';
import { CountryEnum } from '../../enums/country.enum';

/**
 * Multi-country selection field. Value is an array of ISO 3166-1 alpha-2 country codes.
 */
export class CountriesFieldDto extends BaseFieldDto {
  /**
   * Discriminator literal.
   */
  @Equals('COUNTRIES')
  @JSONSchema({
    title: 'Field Type',
    description: "Discriminator literal — always 'COUNTRIES' for this DTO.",
    type: 'string',
    enum: ['COUNTRIES'],
  })
  type: 'COUNTRIES' = 'COUNTRIES' as const;

  /**
   * Value of the field — ISO 3166-1 alpha-2 country codes.
   */
  @IsArray()
  @IsEnum(CountryEnum, { each: true })
  @IsOptional()
  @JSONSchema({
    title: 'Value',
    description: 'Array of ISO 3166-1 alpha-2 country codes.',
    type: 'array',
    items: { type: 'string', enum: Object.values(CountryEnum) },
  })
  value?: string[];
}
