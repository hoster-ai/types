import {
  IsString,
  IsEmail,
  IsUrl,
  IsEnum,
  IsArray,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { CountryEnum } from '../enums/country.enum';
import { LanguageEnum } from '../enums/language.enum';

export class CompanyDataDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail({}, { each: true })
  @IsArray()
  emails!: string[];

  @IsEmail()
  invoiceEmail!: string;

  @IsUrl()
  privacyPolicyUrl!: string;

  @IsEnum(LanguageEnum)
  defaultLanguage!: LanguageEnum;

  @IsEnum(LanguageEnum, { each: true })
  @IsArray()
  languages!: LanguageEnum[];

  @IsString()
  telephone!: string;

  @IsString()
  @IsOptional()
  mobile?: string;

  @IsString()
  address1!: string;

  @IsString()
  @IsOptional()
  address2?: string;

  @IsString()
  @IsOptional()
  address3?: string;

  @IsString()
  postcode!: string;

  @IsString()
  city!: string;

  @IsEnum(CountryEnum)
  country!: CountryEnum;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  vat?: string;

  @IsString()
  @IsOptional()
  taxOffice?: string;
}
