import { CountryEnum } from "../enums/country.enum";
import { LanguageEnum } from "../enums/language.enum";

export class CompanyDataDto {
  id: string;
  name: string;
  emails: string[];
  invoiceEmail: string;
  privacyPolicyUrl: string;
  defaultLanguage: LanguageEnum;
  languages: LanguageEnum[];
  telephone: string;
  mobile?: string;
  address1: string;
  address2?: string;
  address3?: string;
  postcode: string;
  city: string;
  country: CountryEnum;
  state?: string;
  vat?: string;
  taxOffice?: string;
}
