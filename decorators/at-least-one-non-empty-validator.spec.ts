import { validate } from 'class-validator';
import { AtLeastOneNonEmptyProperty } from '../decorators/at-least-one-non-empty.validator';

@AtLeastOneNonEmptyProperty(['a', 'b', 'c'], {
  message: 'At least one of a, b, or c must be non-empty.',
})
class TestDto {
  a?: any;
  b?: any;
  c?: any;

  constructor(data: Partial<TestDto>) {
    Object.assign(this, data);
  }
}
@AtLeastOneNonEmptyProperty(['a', 'b', 'c'])
class TestDto2 {
  a?: any;
  b?: any;
  c?: any;

  constructor(data: Partial<TestDto2>) {
    Object.assign(this, data);
  }
}

describe('AtLeastOneNonEmptyClass', () => {
  it('fails when all keys are undefined', async () => {
    const dto = new TestDto({});
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails when all keys are empty arrays/objects', async () => {
    const dto = new TestDto({ a: [], b: {}, c: [] });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when one key is a non-empty array', async () => {
    const dto = new TestDto({ a: [1], b: [], c: {} });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('passes when one key is a non-empty object', async () => {
    const dto = new TestDto({ a: {}, b: { x: 1 }, c: [] });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when non-object types are present', async () => {
    const dto = new TestDto({ a: 'string', b: 123, c: false });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('passes when multiple keys are non-empty', async () => {
    const dto = new TestDto({ a: [1], b: { test: true }, c: [] });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails when keys are missing', async () => {
    const dto = new TestDto({ d: 'not part of the check' } as any);
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('returns the default error message when validation fails', async () => {
    const dto = new TestDto2({});
    const errors = await validate(dto);

    expect(errors.length).toBeGreaterThan(0);
    const constraints = errors[0].constraints;
    expect(constraints).toBeDefined();
    const messages = Object.values(constraints!);
    expect(messages.some(msg => msg.includes('At least one of the following must be non-empty: a, b, c'))).toBe(true);
  });

});
