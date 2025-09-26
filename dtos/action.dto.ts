import { IsString, IsUrl, IsEnum, IsOptional, IsNotEmpty } from 'class-validator';
import { OpenMethodEnum } from '../enums/open-method.enum';
import { JSONSchema } from 'class-validator-jsonschema';

/**
 * Defines the structure for a UI action.
 * @example
 * {
 *  "icon": "add",
 *  "label": "Create New",
 *  "openMethod": "ajax_call",
 *  "url": "/api/create"
 * }
 */
export class ActionDto {
  /**
   * The name of the icon to display for the action.
   * @example "add"
   */
  @IsString()
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Icon', 
    description: 'Name of the icon to display for the action.', 
    type: 'string'
  })
  icon!: string;

  /**
   * The text label for the action.
   * @optional
   * @example "Create New"
   */
  @IsString()
  @IsOptional()
  @JSONSchema({ 
    title: 'Label', 
    description: 'Text label for the action.', 
    type: 'string'
  })
  label?: string;

  /**
   * The method by which the action's URL should be opened.
   * @see OpenMethodEnum
   */
  @IsEnum(OpenMethodEnum)
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'Open Method', 
    description: 'Method by which the action\'s URL should be opened.', 
    enum: Object.values(OpenMethodEnum)
  })
  openMethod!: OpenMethodEnum;

  /**
   * The URL to navigate to when the action is triggered.
   * @example "/api/create"
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsNotEmpty()
  @JSONSchema({ 
    title: 'URL', 
    description: 'URL to navigate to when the action is triggered.', 
    type: 'string'
  })
  url!: string;
}
