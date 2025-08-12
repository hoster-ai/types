import { validateSync, ValidationError } from 'class-validator';
import { IsPlainObject } from './is-plain-object.validator';

class TestDto {
  @IsPlainObject()
  plainObjectField!: Record<string, any>;
}

describe('IsPlainObject', () => {
  it('should validate plain objects', () => {
    const dto = new TestDto();
    dto.plainObjectField = { key: 'value' };
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should invalidate objects with functions', () => {
    const dto = new TestDto();
    dto.plainObjectField = { key: () => {} };
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate non-object values', () => {
    const dto = new TestDto();
    // @ts-ignore
    dto.plainObjectField = 'not an object';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate null values', () => {
    const dto = new TestDto();
    dto.plainObjectField = null as any;
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});