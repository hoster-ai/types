import 'reflect-metadata';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsStringOrStringArray } from '../decorators/is-string-or-string-array.validator';

class TestDto {
  @IsStringOrStringArray()
  prop!: unknown;
}

class CustomMessageDto {
  @IsStringOrStringArray({ message: 'prop must be text' })
  prop!: unknown;
}

describe('IsStringOrStringArray decorator', () => {
  const cases: [unknown, boolean][] = [
    ['message', true],
    ['', true],
    [['a', 'b'], true],
    [[], true],
    [['a', 1], false],
    [123, false],
    [null, false],
    [undefined, false],
    [{ a: 'b' }, false],
  ];

  it.each(cases)('validates %p as %p', async (value, valid) => {
    const errors = await validate(plainToInstance(TestDto, { prop: value }));
    if (valid) expect(errors).toHaveLength(0);
    else {
      expect(errors).toHaveLength(1);
      expect(errors[0].constraints?.isStringOrStringArray).toBe(
        'prop must be a string or an array of strings',
      );
    }
  });

  it('returns custom message', async () => {
    const errors = await validate(
      plainToInstance(CustomMessageDto, { prop: 123 }),
    );
    expect(errors[0].constraints?.isStringOrStringArray).toBe(
      'prop must be text',
    );
  });
});
