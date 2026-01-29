import { IsArray, IsEnum, IsNotEmpty } from "class-validator";
import { CountryEnum } from "../../enums/country.enum";
import { InfoDto } from "../info.dto";
import { InvoiceTypesEnum } from "../../enums/invoice/invoice-types.enum";
import { JSONSchema } from 'class-validator-jsonschema';

export class InvoiceInfoDto extends InfoDto {
    supportedCountries!: CountryEnum[];

    /**
     * A list of actions that are supported by this integration.
     */
    @IsNotEmpty()
    @IsArray()
    @IsEnum(InvoiceTypesEnum, { each: true })
    @JSONSchema({
        title: 'Supported Types',
        description: 'Types of invoice supported by this integration.',
        type: 'array',
        items: { type: 'string', enum: Object.values(InvoiceTypesEnum) }
    })
    supportedTypes: InvoiceTypesEnum[] = [];
}