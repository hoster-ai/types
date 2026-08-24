import 'reflect-metadata';
import { validateUrlFieldDto } from './url-field-validator';
import { LanguageEnum } from '../../enums/language.enum';

const baseValidDto = {
  id: 'url-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Website' }],
  type: 'URL',
  required: true,
  disabled: false,
};

describe('UrlFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateUrlFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid URL value', () => {
      expect(
        validateUrlFieldDto({
          ...baseValidDto,
          value: 'https://example.com',
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateUrlFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 'not a url' }, 'value'],
      [{ ...baseValidDto, value: 42 }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateUrlFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
