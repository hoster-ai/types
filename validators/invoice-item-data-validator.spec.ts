import 'reflect-metadata';
import { validateInvoiceItemDataDto } from './invoice-item-data-validator';
import { InvoiceItemActionsEnum } from '../enums/invoice/invoice-item-actions.enum';
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

const baseValidDto = {
  productId: 'prod-123',
  productName: 'Web Hosting',
  resourceName: 'hosting-basic',
  productAttributes: { plan: 'basic' },
  itemAttributes: { domain: 'example.com' },
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  action: InvoiceItemActionsEnum.CREATE,
  netAmount: 100,
  vatRate: 24,
  vatAmount: 24,
  treatment: VatTreatmentEnum.DOMESTIC,
};

describe('InvoiceItemDataDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateInvoiceItemDataDto(baseValidDto)).toHaveLength(0);
    });

    it.each(Object.values(InvoiceItemActionsEnum))(
      'should accept action %s',
      (action) => {
        const dto = { ...baseValidDto, action };
        expect(validateInvoiceItemDataDto(dto)).toHaveLength(0);
      },
    );
  });

  describe('Missing required fields', () => {
    it('should return error when action is missing', () => {
      const { action, ...dto } = baseValidDto;
      const errors = validateInvoiceItemDataDto(dto);
      expect(errors.some((e) => e.property === 'action')).toBe(true);
    });

    it('should return errors for inherited required fields when missing', () => {
      const errors = validateInvoiceItemDataDto({});
      expect(errors.some((e) => e.property === 'action')).toBe(true);
      expect(errors.some((e) => e.property === 'productId')).toBe(true);
    });
  });

  describe('VAT per line', () => {
    const errorsOf = (dto: object): string[] =>
      validateInvoiceItemDataDto(dto).map((e) => e.property);

    it.each(['netAmount', 'vatRate', 'vatAmount', 'treatment'])(
      'requires %s',
      (field) => {
        const dto: Record<string, unknown> = { ...baseValidDto };
        delete dto[field];
        expect(errorsOf(dto)).toEqual([field]);
      },
    );

    it.each([
      ['netAmount', 10.005],
      ['netAmount', -1],
      ['vatAmount', 2.401],
      ['vatAmount', -0.01],
      ['vatRate', 24.125],
      ['vatRate', -1],
      ['vatRate', 100.01],
      ['treatment', 'zero_rated'],
    ])('rejects %s = %p', (field, value) => {
      expect(errorsOf({ ...baseValidDto, [field]: value })).toEqual([field]);
    });

    it('accepts 2dp amounts and a 2dp rate', () => {
      expect(
        errorsOf({
          ...baseValidDto,
          netAmount: 10.5,
          vatRate: 5.5,
          vatAmount: 0.58,
        }),
      ).toEqual([]);
    });

    it.each([
      VatTreatmentEnum.REVERSE_CHARGE,
      VatTreatmentEnum.OUTSIDE_SCOPE,
      VatTreatmentEnum.EXEMPT,
      VatTreatmentEnum.OSS,
    ])('requires exemptionReason on a 0%% %s line', (treatment) => {
      const zero = { ...baseValidDto, vatRate: 0, vatAmount: 0, treatment };
      expect(errorsOf(zero)).toEqual(['exemptionReason']);
      expect(errorsOf({ ...zero, exemptionReason: '' })).toEqual([
        'exemptionReason',
      ]);
      expect(
        errorsOf({
          ...zero,
          exemptionReason: 'Article 196 Directive 2006/112/EC',
        }),
      ).toEqual([]);
    });

    it('does not require exemptionReason on a 0% domestic line or a taxed line', () => {
      expect(errorsOf({ ...baseValidDto, vatRate: 0, vatAmount: 0 })).toEqual(
        [],
      );
      expect(
        errorsOf({
          ...baseValidDto,
          treatment: VatTreatmentEnum.OSS,
          vatRate: 19,
          vatAmount: 19,
        }),
      ).toEqual([]);
    });

    it('still checks an exemptionReason that is sent when not required', () => {
      expect(errorsOf({ ...baseValidDto, exemptionReason: 42 })).toEqual([
        'exemptionReason',
      ]);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid action enum', () => {
      const dto = { ...baseValidDto, action: 'invalid-action' };
      const errors = validateInvoiceItemDataDto(dto);
      expect(errors.some((e) => e.property === 'action')).toBe(true);
    });
  });
});
