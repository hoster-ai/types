import { IsDefined, IsEnum, IsString } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

export class MultilangTextDto {
  @IsEnum(LanguageEnum)
  @IsDefined()
  language!: LanguageEnum;

  @IsString()
  @IsDefined()
  text!: string;
}
