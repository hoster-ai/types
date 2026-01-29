import { CountryEnum } from "../enums/country.enum";

export class InvoiceContactData {
    invoiceContactId!: string;
    isBusinessContact!: boolean;
    firstName!: string;
    lastName!: string;
    businessName?: string;
    email!: string;
    telephone!: string; // +00.1111111111
    mobile?: string; // +00.1111111111
    address1!: string;
    address2?: string;
    address3?: string;
    postcode!: string;
    city!: string;
    country!: CountryEnum;
    state?: string;
    tin?: string;
    taxOffice?: string;
    profession?: string;
}