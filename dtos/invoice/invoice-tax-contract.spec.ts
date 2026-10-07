import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { CountryEnum } from '../../enums/country.enum';
import { VatTreatmentEnum } from '../../enums/invoice/vat-treatment.enum';
import { TaxDetailsRequestDto } from '../tax-manager/tax-details-request.dto';
import { TaxDetailsResponseDto } from './responses/tax-details-response.dto';
import { CreditNoteRequestDto } from './requests/credit-note-request.dto';
import { InvoiceRequestDto } from './requests/invoice-request.dto';

type Ctor = new () => object;

/** Properties that fail validation, top level only, sorted. */
const failing = (cls: Ctor, body: Record<string, unknown>): string[] =>
  validateSync(plainToInstance(cls, body) as object)
    .map((e) => e.property)
    .sort();

const without = (
  body: Record<string, unknown>,
  key: string,
): Record<string, unknown> => {
  const copy = { ...body };
  delete copy[key];
  return copy;
};

describe('TaxDetailsRequestDto', () => {
  const REQUEST = {
    sellerCountry: CountryEnum.GREECE,
    buyerCountry: CountryEnum.GERMANY,
    buyerVatNumber: 'DE123456789',
    buyerPostalCode: '10115',
    isBusinessContact: true,
    paymentCountry: CountryEnum.GERMANY,
  };

  it('accepts a full request', () => {
    expect(failing(TaxDetailsRequestDto, REQUEST)).toEqual([]);
  });

  it('accepts a consumer without VAT number, postal code or payment country', () => {
    expect(
      failing(TaxDetailsRequestDto, {
        sellerCountry: CountryEnum.GREECE,
        buyerCountry: CountryEnum.FRANCE,
        isBusinessContact: false,
      }),
    ).toEqual([]);
  });

  it.each(['sellerCountry', 'buyerCountry', 'isBusinessContact'])(
    'requires %s',
    (field) => {
      expect(failing(TaxDetailsRequestDto, without(REQUEST, field))).toEqual([
        field,
      ]);
    },
  );

  it('rejects countries outside the enum and an empty VAT number', () => {
    expect(
      failing(TaxDetailsRequestDto, {
        ...REQUEST,
        sellerCountry: 'XX',
        paymentCountry: 'XX',
        buyerVatNumber: '',
        isBusinessContact: 'yes',
      }),
    ).toEqual([
      'buyerVatNumber',
      'isBusinessContact',
      'paymentCountry',
      'sellerCountry',
    ]);
  });
});

describe('TaxDetailsResponseDto', () => {
  const RESPONSE = {
    code: 200,
    message: 'ok',
    vatNumberValid: true,
    vatRate: 0,
    treatment: VatTreatmentEnum.REVERSE_CHARGE,
    exemptionReason: 'Reverse charge, Article 196 Directive 2006/112/EC',
  };

  it('accepts a reverse-charge answer with its reason', () => {
    expect(failing(TaxDetailsResponseDto, RESPONSE)).toEqual([]);
  });

  it('accepts a domestic answer without VAT number check or reason', () => {
    expect(
      failing(TaxDetailsResponseDto, {
        code: 200,
        message: 'ok',
        vatRate: 24,
        treatment: VatTreatmentEnum.DOMESTIC,
      }),
    ).toEqual([]);
  });

  it('requires exemptionReason on a 0% rate outside domestic', () => {
    expect(
      failing(TaxDetailsResponseDto, without(RESPONSE, 'exemptionReason')),
    ).toEqual(['exemptionReason']);
  });

  it('accepts exemptionReason: null where no reason is needed', () => {
    expect(
      failing(TaxDetailsResponseDto, {
        code: 200,
        message: 'ok',
        vatRate: 24,
        treatment: VatTreatmentEnum.DOMESTIC,
        exemptionReason: null,
      }),
    ).toEqual([]);
  });

  it('rejects an exponential vatRate instead of throwing', () => {
    expect(
      failing(TaxDetailsResponseDto, { ...RESPONSE, vatRate: 1e-7 }),
    ).toEqual(['vatRate']);
  });

  it.each(['vatRate', 'treatment'])('requires %s', (field) => {
    expect(failing(TaxDetailsResponseDto, without(RESPONSE, field))).toEqual([
      field,
    ]);
  });

  it.each([-1, 100.5, 7.125])('rejects vatRate %p', (vatRate) => {
    expect(
      failing(TaxDetailsResponseDto, {
        ...RESPONSE,
        vatRate,
        treatment: VatTreatmentEnum.OSS,
      }),
    ).toEqual(['vatRate']);
  });

  it('rejects a treatment outside the enum', () => {
    expect(
      failing(TaxDetailsResponseDto, { ...RESPONSE, treatment: 'zero' }),
    ).toEqual(['treatment']);
  });
});

describe('invoice document requests - totals and credit note parent', () => {
  const TOTALS = {
    netTotal: 100,
    vatTotal: 24,
    totalAmount: 124,
    discountAmount: 0,
  };
  const TOTAL_FIELDS = Object.keys(TOTALS);
  const PARENT_FIELDS = [
    'parentInvoiceId',
    'parentExternalInvoiceId',
    'parentInvoiceNumber',
  ];

  /** Only the fields this spec is about; company, contact and items have their own specs. */
  const failingOf = (
    cls: Ctor,
    body: Record<string, unknown>,
    fields: string[],
  ): string[] => failing(cls, body).filter((p) => fields.includes(p));

  it('accepts 2dp totals', () => {
    expect(
      failingOf(
        InvoiceRequestDto,
        { ...TOTALS, netTotal: 10.5, vatTotal: 2.52, totalAmount: 13.02 },
        TOTAL_FIELDS,
      ),
    ).toEqual([]);
  });

  it.each(TOTAL_FIELDS)('requires %s', (field) => {
    expect(
      failingOf(InvoiceRequestDto, without(TOTALS, field), TOTAL_FIELDS),
    ).toEqual([field]);
  });

  it.each(TOTAL_FIELDS)('rejects a negative or 3dp %s', (field) => {
    expect(
      failingOf(InvoiceRequestDto, { ...TOTALS, [field]: -1 }, TOTAL_FIELDS),
    ).toEqual([field]);
    expect(
      failingOf(InvoiceRequestDto, { ...TOTALS, [field]: 1.001 }, TOTAL_FIELDS),
    ).toEqual([field]);
  });

  it('requires the three parent references on a credit note', () => {
    expect(failingOf(CreditNoteRequestDto, {}, PARENT_FIELDS)).toEqual(
      [...PARENT_FIELDS].sort(),
    );
    expect(
      failingOf(
        CreditNoteRequestDto,
        {
          parentInvoiceId: '66d0a1b2c3d4e5f6a7b8c9d0',
          parentExternalInvoiceId: 'ext-abc-123',
          parentInvoiceNumber: 'INV-2026-0001',
        },
        PARENT_FIELDS,
      ),
    ).toEqual([]);
  });

  it('keeps the parent reference optional on an invoice', () => {
    expect(failingOf(InvoiceRequestDto, {}, ['parentInvoiceId'])).toEqual([]);
  });
});
