import { IsDefined, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';
import { JSONSchema } from 'class-validator-jsonschema';

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
  @JSONSchema({
    title: 'Language',
    description: 'The language of the text.',
    $ref: '#/components/schemas/LanguageEnum',
  })
  language!: LanguageEnum;

  /**
   * The text content in the specified language.
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({
    title: 'Text',
    description: 'The text content in the specified language.',
    type: 'string',
  })
  text!: string;
}
