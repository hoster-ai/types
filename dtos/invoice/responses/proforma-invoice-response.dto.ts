import { IsNotEmpty, IsString, IsUrl } from "class-validator";

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