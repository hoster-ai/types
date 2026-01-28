import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { CountryEnum } from "../../enums/country.enum";
import { InfoDto } from "../info.dto";
import { InvoiceActionsEnum } from "../../enums/invoice/invoice-actions.enum";
import { JSONSchema } from 'class-validator-jsonschema';

export class InvoiceInfoDto extends InfoDto {
    supportedCountries!: CountryEnum[];

    /**
     * A list of actions that are supported by this integration.
     */
    @IsNotEmpty()
    @IsArray()
    @IsEnum(InvoiceActionsEnum, { each: true })
    @JSONSchema({
        title: 'Supported Actions',
        description: 'Actions supported by this integration.',
        type: 'array',
        items: { type: 'string', enum: Object.values(InvoiceActionsEnum) }
    })
    supportedActions: InvoiceActionsEnum[] = [];
}