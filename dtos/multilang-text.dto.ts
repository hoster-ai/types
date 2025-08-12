import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

/**
 * DTO for multilingual text.
 * Used for providing text in multiple languages.
 */
export class MultilangTextDto {
  /**
   * The language of the text.
   * @see LanguageEnum
   */
  @IsEnum(LanguageEnum)
  @IsDefined()
  language!: LanguageEnum;

  /**
   * The text content in the specified language.
   */
  @IsString()
  @IsNotEmpty()
  text!: string;
}
