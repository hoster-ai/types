import { TransactionData } from "../transaction-data.dto";

export class ProformaInvoiceRequestDto {
    invoiceId!: string;
    companyId!: string;
    transactions!: TransactionData[];
    invoiceContact!: InvoiceContactData;
    items!: ItemData[]:
    totalAmount!: number;
}
