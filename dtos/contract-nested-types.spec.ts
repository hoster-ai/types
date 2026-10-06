import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { InvoiceRequestDto } from './invoice/requests/invoice-request.dto';
import { CompanyDataDto } from './company-data.dto';
import { InvoiceContactData } from './invoice-contact-data.dto';
import { InvoiceItemDataDto } from './invoice/invoice-item-data.dto';
import { TransactionData } from './invoice/transaction-data.dto';
import { TaxDetailsResponseDto } from './invoice/responses/tax-details-response.dto';
import { TINValidationDetails } from './invoice/tin-validation-details.dto';
import { ProductInfoResponseDto } from './product/responses/product-info-response.dto';
import { ProductInfoDto } from './product/product-info.dto';

/**
 * Nested contract DTOs must come out of `plainToInstance` as their declared
 * classes, otherwise `@ValidateNested` silently validates a plain object.
 */
describe('contract DTOs - nested @Type targets', () => {
  it('builds the nested classes of an invoice request', () => {
    const dto = plainToInstance(InvoiceRequestDto, {
      company: {},
      invoiceContact: {},
      items: [{}],
      transactions: [{}],
    });
    expect(dto.company).toBeInstanceOf(CompanyDataDto);
    expect(dto.invoiceContact).toBeInstanceOf(InvoiceContactData);
    expect(dto.items[0]).toBeInstanceOf(InvoiceItemDataDto);
    expect(dto.transactions[0]).toBeInstanceOf(TransactionData);
  });

  it('builds the TIN details of a tax details response', () => {
    const dto = plainToInstance(TaxDetailsResponseDto, { taxDetails: {} });
    expect(dto.taxDetails).toBeInstanceOf(TINValidationDetails);
  });

  it('builds the info of a product info response', () => {
    const dto = plainToInstance(ProductInfoResponseDto, { info: {} });
    expect(dto.info).toBeInstanceOf(ProductInfoDto);
  });
});
