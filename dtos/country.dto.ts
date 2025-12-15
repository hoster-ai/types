import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CountryDto {
  /**
   * Name of the country
   */
  @IsNotEmpty()
  @IsString()
  name!: string;

  /**
   * ISO 3166-1 alpha-2 code
   */
  @IsNotEmpty()
  @IsString()
  code!: string;

  /**
   * Whether the country is in Europe
   */
  @IsOptional()
  @IsBoolean()
  isEurope?: boolean;
}
