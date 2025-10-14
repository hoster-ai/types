import { Transform, Type } from "class-transformer";
import { IsArray, IsOptional, ValidateNested, ArrayMinSize } from "class-validator";
import { ActionDto } from "./action.dto";
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from "./menu.dto";
import { TabDto } from "./tab.dto";
import { transformMenu } from "../transformers/menu.transformer";
import { IsOneOf } from "../decorators/is-one-of.validator";
import { AtLeastOneNonEmptyProperty } from "../decorators/at-least-one-non-empty.validator";
import { JSONSchema } from 'class-validator-jsonschema';

@AtLeastOneNonEmptyProperty(["item"])
export class ClientPanelTabsDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => TabDto)
    @JSONSchema({ 
        title: 'Item Tabs', 
        description: 'Tabs shown on the item page in Client panel.',
        type: 'array',
        items: { $ref: '#/components/schemas/TabDto' }
    })
    item?: TabDto[];
}

@AtLeastOneNonEmptyProperty(["item"])
export class ClientPanelMoreActionsDto {
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => ActionDto)
    @JSONSchema({ 
        title: 'Item Actions', 
        description: 'Additional actions available on the item page in Client panel.',
        type: 'array',
        items: { $ref: '#/components/schemas/ActionDto' }
    })
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
    @JSONSchema({ 
        title: 'Tabs', 
        description: 'Tab structure for Client panel.',
        type: 'object',
        properties: { tabs: { $ref: '#/components/schemas/ClientPanelTabsDto' } }
    })
    tabs?: ClientPanelTabsDto;
    /**
     * Defines additional actions that can be performed in the client panel.
     */
    @IsOptional()
    @ValidateNested()
    @Type(() => ClientPanelMoreActionsDto)
    @JSONSchema({ 
        title: 'More Actions', 
        description: 'Additional actions in Client panel.',
        type: 'object',
        properties: { moreActions: { $ref: '#/components/schemas/ClientPanelMoreActionsDto' } }
    })
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
    @JSONSchema({ 
        title: 'Menu', 
        description: 'Client panel main menu (URL or submenu variant).',
        oneOf: [{ $ref: '#/components/schemas/MenuDtoWithSubmenu' }, { $ref: '#/components/schemas/MenuDtoWithUrl' }],
    })
    menu?: MenuDtoWithSubmenu | MenuDtoWithUrl;
}

