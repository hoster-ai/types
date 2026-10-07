import 'reflect-metadata';
import { validateSync } from 'class-validator';
import {
  IsMoneyAmount,
  MatchesAmount,
  sumOf,
} from './is-money-amount.validator';

class TestDto {
  @IsMoneyAmount()
  net!: number;

  @MatchesAmount((dto: TestDto) => dto.net * 2, 'net × 2')
  double!: number;
}

const errorsFor = (body: Partial<Record<keyof TestDto, unknown>>) =>
  validateSync(Object.assign(new TestDto(), body));

describe('IsMoneyAmount', () => {
  it.each([0, 12, 12.34])('accepts %p', (net) => {
    expect(errorsFor({ net, double: net * 2 })).toEqual([]);
  });

  it.each([undefined, -0.01, 12.345, '12'])('rejects %p', (net) => {
    expect(errorsFor({ net, double: 0 }).map((e) => e.property)).toContain(
      'net',
    );
  });

  it('stays required under skipMissingProperties', () => {
    const errors = validateSync(Object.assign(new TestDto(), { double: 0 }), {
      skipMissingProperties: true,
    });
    expect(errors.map((e) => e.property)).toEqual(['net']);
  });
});

describe('MatchesAmount', () => {
  it.each([20, 20.01, 19.99])('accepts %p, within 0.01 of 20', (double) => {
    expect(errorsFor({ net: 10, double })).toEqual([]);
  });

  it('rejects an amount more than 0.01 off, with a custom message', () => {
    expect(errorsFor({ net: 10, double: 20.02 })[0].constraints).toEqual({
      matchesAmount: 'double must equal net × 2 within 0.01',
    });
  });

  it('skips the check when the expected value is not a number', () => {
    const errors = errorsFor({ net: 'x', double: 5 });
    expect(errors.map((e) => e.property)).toEqual(['net']);
  });
});

describe('sumOf', () => {
  it('sums a key over the items', () => {
    expect(sumOf([{ a: 1.1 }, { a: 2.2 }], 'a')).toBeCloseTo(3.3);
    expect(sumOf([], 'a')).toBe(0);
  });

  it.each([undefined, [{ a: 1 }, { a: '2' }], [null]])(
    'gives NaN for %p',
    (items) => {
      expect(sumOf(items, 'a')).toBeNaN();
    },
  );
});
