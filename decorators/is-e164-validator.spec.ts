import { validateSync, ValidationError } from 'class-validator';
import { IsE164 } from './is-e164.validator';

class TestDto {
  @IsE164()
  phone!: string;
}

describe('IsE164', () => {
  it('should validate canonical E.164 numbers', () => {
    const dto = new TestDto();
    dto.phone = '+14155552671';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate another canonical E.164 number', () => {
    const dto = new TestDto();
    dto.phone = '+306912345678';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('should invalidate numbers without leading +', () => {
    const dto = new TestDto();
    dto.phone = '14155552671';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate numbers with spaces or formatting', () => {
    const dto = new TestDto();
    dto.phone = '+1 415 555 2671';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate clearly invalid strings', () => {
    const dto = new TestDto();
    dto.phone = 'not-a-phone';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate non-string values', () => {
    const dto = new TestDto();
    // @ts-expect-error -- intentionally wrong type for negative test
    dto.phone = 14155552671;
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('should invalidate empty strings', () => {
    const dto = new TestDto();
    dto.phone = '';
    const errors: ValidationError[] = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
