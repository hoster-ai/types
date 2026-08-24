import { validateSync, ValidationError } from 'class-validator';
import { UniqueFieldInArray } from './unique-field-in-array.validator';

class TestDto {
  @UniqueFieldInArray('id')
  items!: Array<{ id: number }>;
}

describe('UniqueFieldInArray', () => {
  it('should validate array with unique field values', () => {
    const dto = new TestDto();
    dto.items = [{ id: 1 }, { id: 2 }];
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should invalidate array with duplicate field values', () => {
    const dto = new TestDto();
    dto.items = [{ id: 1 }, { id: 1 }];
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should validate empty array', () => {
    const dto = new TestDto();
    dto.items = [];
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should support dotted paths for nested fields', () => {
    class NestedDto {
      @UniqueFieldInArray('nested.id')
      items!: Array<{ nested: { id: number } }>;
    }

    const ok = new NestedDto();
    ok.items = [{ nested: { id: 1 } }, { nested: { id: 2 } }];
    expect(validateSync(ok).length).toBe(0);

    const bad = new NestedDto();
    bad.items = [{ nested: { id: 1 } }, { nested: { id: 1 } }];
    expect(validateSync(bad).length).toBeGreaterThan(0);
  });
});
