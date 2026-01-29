import { IsOptional, IsString } from "class-validator";
import { ProformaInvoiceRequestDto } from "./proforma-invoice-request.dto";

export class CreditNoteRequestDto extends ProformaInvoiceRequestDto {

    @IsOptional()
    @IsString()
    parentInvoiceId!: string;
    
}