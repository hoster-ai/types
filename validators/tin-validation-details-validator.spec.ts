import 'reflect-metadata';
import { validateTINValidationDetailsDto } from './tin-validation-details-validator';
import { CountryEnum } from '../enums/country.enum';

const baseValidDto = {
  address1: '123 Main St',
  postcode: '12345',
  city: 'Athens',
  country: CountryEnum.GREECE,
};

describe('TINValidationDetails Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO with required fields only', () => {
      expect(validateTINValidationDetailsDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with all optional fields', () => {
      const dto = {
        ...baseValidDto,
        companyName: 'Acme Corp',
        address2: 'Suite 100',
        address3: 'Building A',
        state: 'Attica',
        tin: 'EL123456789',
        taxOffice: 'Athens Tax Office',
        profession: 'Software Development',
      };
      expect(validateTINValidationDetailsDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateTINValidationDetailsDto({});
      const requiredProps = ['address1', 'postcode', 'city', 'country'];
      for (const prop of requiredProps) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });

    it('should return error when address1 is missing', () => {
      const { address1, ...dto } = baseValidDto;
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'address1')).toBe(true);
    });

    it('should return error when country is missing', () => {
      const { country, ...dto } = baseValidDto;
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'country')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid country code', () => {
      const dto = { ...baseValidDto, country: 'INVALID' };
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'country')).toBe(true);
    });

    it('should return error for postcode exceeding max length', () => {
      const dto = { ...baseValidDto, postcode: '1'.repeat(17) };
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'postcode')).toBe(true);
    });

    it('should return error for city exceeding max length', () => {
      const dto = { ...baseValidDto, city: 'a'.repeat(251) };
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'city')).toBe(true);
    });

    it('should return error for companyName exceeding max length', () => {
      const dto = { ...baseValidDto, companyName: 'a'.repeat(251) };
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'companyName')).toBe(true);
    });

    it('should return error for tin exceeding max length', () => {
      const dto = { ...baseValidDto, tin: 'X'.repeat(21) };
      const errors = validateTINValidationDetailsDto(dto);
      expect(errors.some((e) => e.property === 'tin')).toBe(true);
    });
  });
});
