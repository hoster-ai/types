import { validateMultilangTextDto } from './multilang-text-validator';
import { LanguageEnum } from '../enums/language.enum';

describe('MultilangTextDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      language: LanguageEnum.EN,
      text: 'Hello World',
    };

    const errors = validateMultilangTextDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error for invalid language', () => {
    const invalidDto = {
      language: 'not-a-language',
      text: 'Hello World',
    };

    const errors = validateMultilangTextDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'language')).toBe(true);
  });

  it('should return error for missing text', () => {
    const invalidDto = {
      language: LanguageEnum.EN,
      // Missing text
    };

    const errors = validateMultilangTextDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'text')).toBe(true);
  });
});
