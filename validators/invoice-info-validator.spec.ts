import 'reflect-metadata';
import { validateInvoiceInfoDto } from './invoice-info-validator';
import { LanguageEnum } from '../enums/language.enum';
import { InvoiceTypesEnum } from '../enums/invoice/invoice-types.enum';
import { CountryEnum } from '../enums/country.enum';

const baseValidDto = {
  title: 'Invoice Integration',
  supportedLanguages: [LanguageEnum.ENGLISH],
  supportedTypes: [InvoiceTypesEnum.INVOICE],
  supportedCountries: [CountryEnum.GREECE],
};

describe('InvoiceInfoDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      const errors = validateInvoiceInfoDto(baseValidDto);
      expect(errors).toHaveLength(0);
    });

    it('should return no errors with all supported types', () => {
      const dto = {
        ...baseValidDto,
        supportedTypes: [
          InvoiceTypesEnum.INVOICE,
          InvoiceTypesEnum.CREDIT_NOTE,
          InvoiceTypesEnum.PROFORMA,
        ],
      };
      expect(validateInvoiceInfoDto(dto)).toHaveLength(0);
    });

    it('should return no errors with optional inherited fields', () => {
      const dto = {
        ...baseValidDto,
        logo: 'https://example.com/logo.png',
        description: 'An invoice integration',
        onboardingUrl: 'https://example.com/onboarding',
      };
      expect(validateInvoiceInfoDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateInvoiceInfoDto({});
      expect(errors.some((e) => e.property === 'title')).toBe(true);
      expect(errors.some((e) => e.property === 'supportedLanguages')).toBe(
        true,
      );
    });

    it('should return error when title is missing', () => {
      const { title, ...dto } = baseValidDto;
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'title')).toBe(true);
    });

    it('should return error when supportedLanguages is missing', () => {
      const { supportedLanguages, ...dto } = baseValidDto;
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'supportedLanguages')).toBe(
        true,
      );
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid supportedTypes enum', () => {
      const dto = { ...baseValidDto, supportedTypes: ['invalid-type'] };
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'supportedTypes')).toBe(true);
    });

    it('should return error for empty title', () => {
      const dto = { ...baseValidDto, title: '' };
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'title')).toBe(true);
    });

    it('should return error for empty supportedLanguages array', () => {
      const dto = { ...baseValidDto, supportedLanguages: [] };
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'supportedLanguages')).toBe(
        true,
      );
    });

    it('should return error for invalid language enum', () => {
      const dto = { ...baseValidDto, supportedLanguages: ['INVALID'] };
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'supportedLanguages')).toBe(
        true,
      );
    });

    it('should return error for invalid logo URL', () => {
      const dto = { ...baseValidDto, logo: 'not-a-url' };
      const errors = validateInvoiceInfoDto(dto);
      expect(errors.some((e) => e.property === 'logo')).toBe(true);
    });
  });
});
