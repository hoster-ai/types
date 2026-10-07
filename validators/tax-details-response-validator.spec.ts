import 'reflect-metadata';
import { validateTaxDetailsResponseDto } from './tax-details-response-validator';
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';

const REVERSE_CHARGE = {
  code: 200,
  message: 'ok',
  vatNumberValid: true,
  vatRate: 0,
  treatment: VatTreatmentEnum.REVERSE_CHARGE,
  exemptionReason: 'Reverse charge, Article 196 Directive 2006/112/EC',
};

const failing = (body: Record<string, unknown>): string[] =>
  validateTaxDetailsResponseDto(body)
    .map((e) => e.property)
    .sort();

describe('validateTaxDetailsResponseDto', () => {
  describe('Valid cases', () => {
    it('accepts a reverse charge with a valid VAT number and its reason', () => {
      expect(failing(REVERSE_CHARGE)).toEqual([]);
    });

    it('accepts an OSS rate', () => {
      expect(
        failing({
          code: 200,
          message: 'ok',
          vatNumberValid: false,
          vatRate: 19,
          treatment: VatTreatmentEnum.OSS,
        }),
      ).toEqual([]);
    });
  });

  describe('Invalid field values', () => {
    it.each([false, undefined])(
      'rejects a reverse charge with vatNumberValid %p',
      (vatNumberValid) => {
        expect(failing({ ...REVERSE_CHARGE, vatNumberValid })).toEqual([
          'treatment',
        ]);
      },
    );

    it.each([
      VatTreatmentEnum.REVERSE_CHARGE,
      VatTreatmentEnum.OUTSIDE_SCOPE,
      VatTreatmentEnum.EXEMPT,
    ])('rejects %s with a positive rate', (treatment) => {
      expect(failing({ ...REVERSE_CHARGE, treatment, vatRate: 24 })).toEqual([
        'treatment',
      ]);
    });

    it.each(['   ', 'x'.repeat(501)])(
      'rejects exemptionReason %p',
      (exemptionReason) => {
        expect(failing({ ...REVERSE_CHARGE, exemptionReason })).toEqual([
          'exemptionReason',
        ]);
      },
    );
  });
});
