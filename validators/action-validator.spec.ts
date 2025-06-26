import { validateActionDto } from './action-validator';
import { OpenMethodEnum } from '../enums/open-method.enum';

describe('ActionDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      icon: 'test-icon',
      openMethod: OpenMethodEnum.AJAX_CALL,
      url: 'http://example.com',
    };

    const errors = validateActionDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid URL', () => {
    const invalidDto = {
      icon: 'test-icon',
      openMethod: OpenMethodEnum.AJAX_CALL,
      url: 'not-a-url',
    };

    const errors = validateActionDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'url')).toBe(true);
  });

  it('should return error for invalid openMethod', () => {
    const invalidDto = {
      icon: 'test-icon',
      openMethod: 'not-an-enum',
      url: 'http://example.com',
    };

    const errors = validateActionDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'openMethod')).toBe(true);
  });
});
