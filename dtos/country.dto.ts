import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CountryEnum } from '../enums/country.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Country information returned by the hoster.ai helper function.
 * Used to provide a list of all available countries.
 */
export class CountryDto {
  /** Country name */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Name',
    description: 'Country name.',
    type: 'string',
  })
  name!: string;

  /** Country code */
  @IsEnum(CountryEnum)
  @JSONSchema({
    title: 'Code',
    description: 'Country code.',
    type: 'string',
    enum: Object.values(CountryEnum),
  })
  code!: CountryEnum;

  /** Whether the country is in Europe */
  @IsBoolean()
  @IsOptional()
  @JSONSchema({
    title: 'Is Europe',
    description: 'Whether the country is in Europe.',
    type: 'boolean',
  })
  isEurope?: boolean;
}