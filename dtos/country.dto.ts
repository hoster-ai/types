import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CountryEnum } from '../enums/country.enum';

/**
 * Country information returned by the hoster.ai helper function.
 * Used to provide a list of all available countries.
 */
export class CountryDto {
  /** Country name */
  @IsString()
  @IsNotEmpty()
  name!: string;

  /** Country code */
  @IsEnum(CountryEnum)
  code!: CountryEnum;

  /** Whether the country is in Europe */
  @IsBoolean()
  @IsOptional()
  isEurope?: boolean;
}