import 'reflect-metadata';
import { validateCountryDto } from './country-validator';
import { CountryEnum } from '../enums/country.enum';

const baseValidDto = {
  name: 'Greece',
  code: CountryEnum.GREECE,
};

describe('CountryDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateCountryDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional isEurope', () => {
      const dto = { ...baseValidDto, isEurope: true };
      expect(validateCountryDto(dto)).toHaveLength(0);
    });

    it('should return no errors with isEurope false', () => {
      const dto = { ...baseValidDto, isEurope: false };
      expect(validateCountryDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateCountryDto({});
      expect(errors.some((e) => e.property === 'name')).toBe(true);
      expect(errors.some((e) => e.property === 'code')).toBe(true);
    });

    it('should return error when name is missing', () => {
      const dto = { code: CountryEnum.GREECE };
      const errors = validateCountryDto(dto);
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('should return error when code is missing', () => {
      const dto = { name: 'Greece' };
      const errors = validateCountryDto(dto);
      expect(errors.some((e) => e.property === 'code')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty name', () => {
      const dto = { ...baseValidDto, name: '' };
      const errors = validateCountryDto(dto);
      expect(errors.some((e) => e.property === 'name')).toBe(true);
    });

    it('should return error for invalid country code', () => {
      const dto = { ...baseValidDto, code: 'INVALID' };
      const errors = validateCountryDto(dto);
      expect(errors.some((e) => e.property === 'code')).toBe(true);
    });

    it('should return error for non-boolean isEurope', () => {
      const dto = { ...baseValidDto, isEurope: 'yes' };
      const errors = validateCountryDto(dto);
      expect(errors.some((e) => e.property === 'isEurope')).toBe(true);
    });
  });
});
