import { Transform, Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";
import { ActionDto } from "./action.dto";
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from "./menu.dto";
import { TabDto } from "./tab.dto";
import { transformMenu } from "../transformers/menu.transformer";
import { IsOneOf } from "../decorators/is-one-of.validator";
import { AtLeastOneNonEmptyClass } from "../decorators/at-least-one-non-empty.validator";

@AtLeastOneNonEmptyClass(["item"])
export class ClientPanelTabsDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => TabDto)
    item?: TabDto[];
}

@AtLeastOneNonEmptyClass(["item"])
export class ClientPanelMoreActionsDto {
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ActionDto)
    item?: ActionDto[];
}

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

