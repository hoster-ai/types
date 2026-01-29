import { IsNotEmpty, IsString, IsUrl } from "class-validator";
import { JSONSchema } from "class-validator-jsonschema";

export class ProformaInvoiceResponseDto {
    @IsUrl()
    @IsNotEmpty()
    invoiceUrl!:string;

    @IsString()
    @IsNotEmpty()
    invoiceNumber!:string;

    @IsString()
    @IsNotEmpty()
    invoiceId!:string;
}