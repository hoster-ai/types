import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested, ArrayMinSize } from "class-validator";
import { ActionDto } from "./action.dto";
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from "./menu.dto";
import { TabDto } from "./tab.dto";
import { transformMenu } from "../transformers/menu.transformer";
import { IsOneOf } from "../decorators/is-one-of.validator";
import { AtLeastOneNonEmptyProperty } from "../decorators/at-least-one-non-empty.validator";

@AtLeastOneNonEmptyProperty(["item"])
export class ClientPanelTabsDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => TabDto)
    item?: TabDto[];
}

@AtLeastOneNonEmptyProperty(["item"])
export class ClientPanelMoreActionsDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ActionDto)
    item?: ActionDto[];
}

@AtLeastOneNonEmptyProperty(["tabs", "moreActions", "menu"])
export class ClientPanelDto {
    /**
     * Defines the tab structure for the client panel.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ClientPanelTabsDto)
    tabs?: ClientPanelTabsDto;
    /**
     * Defines additional actions that can be performed in the client panel.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ClientPanelMoreActionsDto)
    moreActions?: ClientPanelMoreActionsDto;
    /**
     * The main menu for the client panel.
     * This can be a simple menu with a URL or a menu with submenus.
     */
    @IsOptional()
    @ValidateNested()
    @Transform(({ value }) => transformMenu(value))
    @IsOneOf([MenuDtoWithSubmenu, MenuDtoWithUrl], {
        message: 'menu must be either a MenuDtoWithUrl or MenuDtoWithSubmenu',
    })
    menu?: MenuDtoWithSubmenu | MenuDtoWithUrl;
}

