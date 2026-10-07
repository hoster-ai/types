import 'reflect-metadata';
import { validateSync } from 'class-validator';
import { MaxDecimalPlaces } from './max-decimal-places.validator';

class TestDto {
  @MaxDecimalPlaces(2)
  amount!: number;
}

const errorsFor = (amount: unknown) => {
  const dto = new TestDto();
  dto.amount = amount as number;
  return validateSync(dto);
};

describe('MaxDecimalPlaces', () => {
  it.each([0, 12, 12.3, 12.34, -5.5, 1e21])('accepts %p', (amount) => {
    expect(errorsFor(amount)).toEqual([]);
  });

  it.each([12.345, 0.1 + 0.2, NaN, Infinity, '12.34'])(
    'rejects %p',
    (amount) => {
      expect(errorsFor(amount)).toHaveLength(1);
    },
  );

  it('rejects exponential numbers instead of throwing', () => {
    expect(() => errorsFor(1e-7)).not.toThrow();
    expect(errorsFor(1e-7)[0].constraints).toEqual({
      maxDecimalPlaces: 'amount must have at most 2 decimal places',
    });
  });
});
