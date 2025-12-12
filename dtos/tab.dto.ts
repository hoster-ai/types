import { IsString, IsUrl, IsNotEmpty } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

/**
 * DTO for tabs
 * Used for defining tabs in the user interface
 */
export class TabDto {
  /**
   * The label displayed on the tab
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Label', 
    description: 'Text label for the tab.', 
    type: 'string'
  })
  label!: string;

  /**
   * The URL associated with the tab.
   * The requests coming from the hoster will be signed
   * with jwt, which will contain information about the company
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'URL', 
    description: 'URL associated with the tab.', 
    type: 'string',
    format: 'uri'
  })
  url!: string;
}
