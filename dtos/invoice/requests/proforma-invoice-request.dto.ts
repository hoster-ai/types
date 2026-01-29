import { InvoiceContactData } from "../../invoice-contact-data.dto";
import { InvoiceItemDataDto } from "../invoice-item-data.dto";
import { TransactionData } from "../transaction-data.dto";

export class ProformaInvoiceRequestDto {
    invoiceId!: string;
    companyId!: string;
    transactions!: TransactionData[];
    invoiceContact!: InvoiceContactData;
    items!: InvoiceItemDataDto[];
    totalAmount!: number;
}
