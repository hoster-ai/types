import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CountryEnum } from '../enums/country.enum';

export class CountryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEnum(CountryEnum)
  code!: CountryEnum;

  @IsBoolean()
  @IsOptional()
  isEurope?: boolean;
}