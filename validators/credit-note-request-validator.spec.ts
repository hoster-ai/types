import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { validateCreditNoteRequestDto } from './credit-note-request-validator';
import { CreditNoteRequestDto } from '../dtos/invoice/requests/credit-note-request.dto';
import { InvoiceItemActionsEnum } from '../enums/invoice/invoice-item-actions.enum';
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

const line = (netAmount: number, vatAmount: number) => ({
  productId: 'prod-1',
  productName: 'Web Hosting',
  resourceName: 'example.com',
  productAttributes: {},
  itemAttributes: {},
  startDate: '2026-01-01',
  endDate: '2026-12-31',
  action: InvoiceItemActionsEnum.CREATE,
  netAmount,
  vatRate: 24,
  vatAmount,
  treatment: VatTreatmentEnum.DOMESTIC,
});

const PARENT = {
  parentInvoiceId: '66d0a1b2c3d4e5f6a7b8c9d0',
  parentExternalInvoiceId: 'ext-abc-123',
  parentInvoiceNumber: 'INV-2026-0001',
};

const DOCUMENT = {
  ...PARENT,
  items: [line(10, 2.4), line(20.05, 4.81)],
  netTotal: 30.05,
  vatTotal: 7.21,
  totalAmount: 37.26,
  discountAmount: 0,
};

const FIELDS = [
  ...Object.keys(PARENT),
  'items',
  'netTotal',
  'vatTotal',
  'totalAmount',
];

/** Only the fields this spec is about; company and contact have their own specs. */
const failing = (body: Record<string, unknown>): string[] =>
  validateCreditNoteRequestDto(body)
    .map((e) => e.property)
    .filter((p) => FIELDS.includes(p))
    .sort();

describe('validateCreditNoteRequestDto', () => {
  describe('Valid cases', () => {
    it('accepts consistent lines and totals', () => {
      expect(failing(DOCUMENT)).toEqual([]);
    });

    it('accepts totals within 0.01', () => {
      expect(
        failing({ ...DOCUMENT, netTotal: 30.06, totalAmount: 37.27 }),
      ).toEqual([]);
    });
  });

  describe('Missing required fields', () => {
    it('requires the parent references, also under skipMissingProperties', () => {
      const errors = validateSync(plainToInstance(CreditNoteRequestDto, {}), {
        skipMissingProperties: true,
      }).map((e) => e.property);
      expect(errors).toEqual(expect.arrayContaining(Object.keys(PARENT)));
    });
  });

  describe('Invalid field values', () => {
    it('rejects totals that do not match the lines', () => {
      expect(
        failing({
          ...DOCUMENT,
          netTotal: 100,
          vatTotal: 24,
          totalAmount: 150,
        }),
      ).toEqual(['netTotal', 'totalAmount', 'vatTotal']);
    });

    it('rejects a line whose vatAmount does not match its rate', () => {
      expect(
        failing({
          ...DOCUMENT,
          items: [line(10, 5), line(20.05, 4.81)],
          vatTotal: 9.81,
          totalAmount: 39.86,
        }),
      ).toEqual(['items']);
    });

    it('rejects negative amounts on a credit note', () => {
      expect(failing({ ...DOCUMENT, totalAmount: -37.26 })).toEqual([
        'totalAmount',
      ]);
    });
  });
});
