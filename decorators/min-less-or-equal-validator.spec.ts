import 'reflect-metadata';
import { validate } from 'class-validator';
import { MinLessOrEqualMaxProperty } from './min-less-or-equal.validator';

@MinLessOrEqualMaxProperty(['min', 'max'])
class MinMaxDto {
  min?: number;
  max?: number;
  constructor(data: Partial<MinMaxDto>) { Object.assign(this, data); }
}

@MinLessOrEqualMaxProperty([
  ['min1', 'max1'],
  ['min2', 'max2'],
])
class MultiMinMaxDto {
  min1?: number;
  max1?: number;
  min2?: number;
  max2?: number;
  constructor(data: Partial<MultiMinMaxDto>) { Object.assign(this, data); }
}

describe('MinLessOrEqualMaxProperty', () => {
  it('passes when one or both are absent', async () => {
    const dto1 = new MinMaxDto({});
    const dto2 = new MinMaxDto({ min: 1 });
    const dto3 = new MinMaxDto({ max: 2 });
    expect((await validate(dto1)).length).toBe(0);
    expect((await validate(dto2)).length).toBe(0);
    expect((await validate(dto3)).length).toBe(0);
  });

  it('passes when min <= max', async () => {
    const dto = new MinMaxDto({ min: 1, max: 1 });
    const dto2 = new MinMaxDto({ min: 1, max: 2 });
    expect((await validate(dto)).length).toBe(0);
    expect((await validate(dto2)).length).toBe(0);
  });

  it('fails when min > max', async () => {
    const dto = new MinMaxDto({ min: 3, max: 2 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('handles multiple pairs correctly', async () => {
    const ok = new MultiMinMaxDto({ min1: 1, max1: 2, min2: 3, max2: 3 });
    const errorsOk = await validate(ok);
    expect(errorsOk.length).toBe(0);

    const bad = new MultiMinMaxDto({ min1: 1, max1: 0, min2: 3, max2: 3 });
    const errorsBad = await validate(bad);
    expect(errorsBad.length).toBeGreaterThan(0);
  });
});
