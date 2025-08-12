import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsOneOf } from '../decorators/is-one-of.validator';

class A {}
class B {}
class C {}

class TestDto {
  @IsOneOf([A, B], { message: 'value must be instance of A or B' })
  prop!: any;
}

describe('IsOneOf decorator', () => {
  const cases = [
    [new A(), true],
    [new B(), true],
    [new C(), false],
    ['string', false],
    [123, false],
  ];

  it.each(cases)('validates %p as %p', async (value, valid) => {
    const dto = plainToInstance(TestDto, { prop: value });
    const errors = await validate(dto);
    if (valid) expect(errors.length).toBe(0);
    else {
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].constraints).toHaveProperty('isOneOf');
    }
  });

  it('returns custom message', async () => {
    const dto = plainToInstance(TestDto, { prop: 123 });
    const errors = await validate(dto);
    expect(errors[0].constraints?.isOneOf).toBe('value must be instance of A or B');
  });
});
