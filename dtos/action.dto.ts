import { IsString, IsUrl, IsEnum, IsOptional, IsDefined } from 'class-validator';
import { OpenMethodEnum } from '../enums/open-method.enum';

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
  @IsDefined()
  icon!: string;

  /**
   * The text label for the action.
   * @optional
   * @example "Create New"
   */
  @IsString()
  @IsOptional()
  label?: string;

  /**
   * The method by which the action's URL should be opened.
   * @see OpenMethodEnum
   */
  @IsEnum(OpenMethodEnum)
  @IsDefined()
  openMethod!: OpenMethodEnum;

  /**
   * The URL to navigate to when the action is triggered.
   * @example "/api/create"
   */
  @IsUrl({ protocols: ['https'], require_protocol: true })
  @IsDefined()
  url!: string;
}
