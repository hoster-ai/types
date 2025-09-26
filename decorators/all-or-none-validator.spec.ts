import 'reflect-metadata';
import { validate } from 'class-validator';
import { AllOrNoneProperty } from './all-or-none.validator';

// Pairs
@AllOrNoneProperty(['a', 'b'])
class PairDto {
  a?: any;
  b?: any;
  constructor(data: Partial<PairDto>) { Object.assign(this, data); }
}

// Multiple pairs
@AllOrNoneProperty([
  ['a', 'b'],
  ['c', 'd'],
])
class MultiPairDto {
  a?: any;
  b?: any;
  c?: any;
  d?: any;
  constructor(data: Partial<MultiPairDto>) { Object.assign(this, data); }
}

// Group of 3+
@AllOrNoneProperty(['x', 'y', 'z'])
class GroupDto {
  x?: any;
  y?: any;
  z?: any;
  constructor(data: Partial<GroupDto>) { Object.assign(this, data); }
}

describe('AllOrNoneProperty', () => {
  // Single pair
  it('passes when both pair fields are absent', async () => {
    const dto = new PairDto({});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when one of pair fields is present and the other is absent', async () => {
    const dto = new PairDto({ a: 1 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when both pair fields are present', async () => {
    const dto = new PairDto({ a: 1, b: 2 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  // Multiple pairs
  it('passes when all pairs are absent', async () => {
    const dto = new MultiPairDto({});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('passes when all pairs are present', async () => {
    const dto = new MultiPairDto({ a: 1, b: 2, c: 3, d: 4 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when one pair violates the rule', async () => {
    const dto = new MultiPairDto({ a: 1, b: 2, c: 3 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  // 3+ group
  it('passes when all group fields are absent', async () => {
    const dto = new GroupDto({});
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when only a subset of group fields are present', async () => {
    const dto = new GroupDto({ x: 1 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when all group fields are present', async () => {
    const dto = new GroupDto({ x: 1, y: 2, z: 3 });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
