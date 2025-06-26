import { IsString, IsUrl, IsEnum, IsOptional } from 'class-validator';
import { OpenMethodEnum } from "../enums/open-method.enum";

export class ActionDto {
    /**
     * The icon of the action.
     */
    @IsString()
    icon: string;
  
    /**
     * The label of the action (optional).
     */
    @IsString()
    @IsOptional()
    label?: string;

    // TODO Να κανουμε documentation
    @IsEnum(OpenMethodEnum)
    openMethod: OpenMethodEnum;
  
    /**
     * The link of the action.
     */
    @IsUrl()
    url: string;
  }