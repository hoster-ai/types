import 'reflect-metadata';
import { validateCountriesFieldDto } from './countries-field-validator';
import { LanguageEnum } from '../../enums/language.enum';
import { CountryEnum } from '../../enums/country.enum';

const baseValidDto = {
  id: 'countries-1',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Countries' }],
  type: 'COUNTRIES',
  required: true,
  disabled: false,
};

describe('CountriesFieldDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid minimal DTO', () => {
      expect(validateCountriesFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid value array', () => {
      expect(
        validateCountriesFieldDto({
          ...baseValidDto,
          value: [CountryEnum.GREECE, CountryEnum.UNITED_STATES],
        }),
      ).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors for all missing required fields', () => {
      const errors = validateCountriesFieldDto({});
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it.each([
      [{ ...baseValidDto, type: 'TEXT' }, 'type'],
      [{ ...baseValidDto, value: 'GR' }, 'value'],
      [{ ...baseValidDto, value: ['NOT_A_COUNTRY'] }, 'value'],
    ])('should return error for invalid %#', (dto, expectedProp) => {
      const errors = validateCountriesFieldDto(dto);
      expect(errors.some((e) => e.property === expectedProp)).toBe(true);
    });
  });
});
