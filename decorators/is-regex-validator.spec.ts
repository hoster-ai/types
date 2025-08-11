import { validateSync, ValidationError } from 'class-validator';
import { IsRegex } from './is-regex.validator';

class TestDto {
  @IsRegex()
  regexField!: string;
}

describe('IsRegex', () => {
  it('should validate valid regex strings', () => {
    const dto = new TestDto();
    dto.regexField = '^abc$';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should invalidate invalid regex strings', () => {
    const dto = new TestDto();
    dto.regexField = '[';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate non-string values', () => {
    const dto = new TestDto();
    // @ts-ignore
    dto.regexField = 123;
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate empty strings', () => {
    const dto = new TestDto();
    dto.regexField = '';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});