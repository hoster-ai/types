import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

export class CountryDto {

  /**
   * Name of the country
   */
  @IsNotEmpty()
  @IsString()
  @JSONSchema({
    title: 'Name',
    type: 'string',
    description: 'Name of the country',
    example: 'Afghanistan',
  })
  name!: string;

  /**
   * ISO 3166-1 alpha-2 code
   */
  @JSONSchema({
    title: 'Code',
    type: 'string',
    description: 'ISO 3166-1 alpha-2 code',
    example: 'AF',
  })
  @IsNotEmpty()
  @IsString()
  code!: string;

  /**
   * Whether the country is in Europe
   */
  @JSONSchema({
    title: 'Is Europe',
    type: 'boolean',
    description: 'Whether the country is in Europe(european union or european economic area)',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  isEurope?: boolean;
}
