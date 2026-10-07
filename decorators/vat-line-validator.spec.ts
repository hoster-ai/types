import 'reflect-metadata';
import { validateSync, ValidatorOptions } from 'class-validator';
import { VatTreatmentEnum } from '../enums/invoice/vat-treatment.enum';
import {
  IsExemptionReason,
  IsVatRate,
  MatchesVatTreatment,
} from './vat-line.validator';

class LineDto {
  @IsVatRate()
  vatRate!: number;

  @MatchesVatTreatment()
  treatment!: VatTreatmentEnum;

  @IsExemptionReason()
  exemptionReason?: string | null;
}

class AnswerDto extends LineDto {
  vatNumberValid?: boolean;

  @MatchesVatTreatment({ requireValidVatNumber: true })
  declare treatment: VatTreatmentEnum;
}

const failing = (
  cls: new () => object,
  body: Record<string, unknown>,
  options?: ValidatorOptions,
): string[] =>
  validateSync(Object.assign(new cls(), body), options).map((e) => e.property);

const ZERO = {
  vatRate: 0,
  treatment: VatTreatmentEnum.EXEMPT,
  exemptionReason: 'Article 132 Directive 2006/112/EC',
};

describe('IsVatRate', () => {
  it.each([0, 24, 5.5, 100])('accepts %p', (vatRate) => {
    expect(
      failing(LineDto, { vatRate, treatment: VatTreatmentEnum.DOMESTIC }),
    ).toEqual([]);
  });

  it.each([undefined, -1, 100.01, 7.125, 1e-7])('rejects %p', (vatRate) => {
    expect(
      failing(LineDto, { vatRate, treatment: VatTreatmentEnum.DOMESTIC }),
    ).toEqual(['vatRate']);
  });
});

describe('IsExemptionReason', () => {
  it('accepts a reason, and its absence or null where none is needed', () => {
    expect(failing(LineDto, ZERO)).toEqual([]);
    const taxed = { vatRate: 24, treatment: VatTreatmentEnum.DOMESTIC };
    expect(failing(LineDto, taxed)).toEqual([]);
    expect(failing(LineDto, { ...taxed, exemptionReason: null })).toEqual([]);
  });

  it.each([undefined, null, '', '   ', 'x'.repeat(501), 42])(
    'rejects %p where a reason is needed',
    (exemptionReason) => {
      expect(failing(LineDto, { ...ZERO, exemptionReason })).toEqual([
        'exemptionReason',
      ]);
    },
  );

  it('stays required under skipMissingProperties', () => {
    expect(
      failing(
        LineDto,
        { ...ZERO, exemptionReason: undefined },
        { skipMissingProperties: true },
      ),
    ).toEqual(['exemptionReason']);
  });

  it('accepts 500 characters', () => {
    expect(
      failing(LineDto, { ...ZERO, exemptionReason: 'x'.repeat(500) }),
    ).toEqual([]);
  });
});

describe('MatchesVatTreatment', () => {
  it.each([
    VatTreatmentEnum.REVERSE_CHARGE,
    VatTreatmentEnum.OUTSIDE_SCOPE,
    VatTreatmentEnum.EXEMPT,
  ])('requires vatRate 0 with %s', (treatment) => {
    expect(failing(LineDto, { ...ZERO, treatment })).toEqual([]);
    const errors = validateSync(
      Object.assign(new LineDto(), { ...ZERO, treatment, vatRate: 24 }),
    );
    expect(errors.map((e) => e.constraints)).toEqual([
      {
        matchesVatTreatment: `treatment ${treatment} charges no VAT, so vatRate must be 0`,
      },
    ]);
  });

  it.each([VatTreatmentEnum.DOMESTIC, VatTreatmentEnum.OSS])(
    'allows any rate with %s',
    (treatment) => {
      expect(failing(LineDto, { vatRate: 24, treatment })).toEqual([]);
    },
  );

  it('leaves a missing vatRate to its own validation', () => {
    expect(failing(LineDto, { treatment: VatTreatmentEnum.EXEMPT })).toEqual([
      'vatRate',
    ]);
  });

  it('with requireValidVatNumber, needs vatNumberValid: true for reverse_charge', () => {
    const rc = { ...ZERO, treatment: VatTreatmentEnum.REVERSE_CHARGE };
    expect(failing(AnswerDto, { ...rc, vatNumberValid: true })).toEqual([]);
    expect(failing(AnswerDto, rc)).toEqual(['treatment']);
    expect(
      validateSync(
        Object.assign(new AnswerDto(), { ...rc, vatNumberValid: false }),
      )[0].constraints,
    ).toEqual({
      matchesVatTreatment:
        'treatment reverse_charge requires vatNumberValid: true',
    });
    expect(failing(LineDto, rc)).toEqual([]);
  });
});
