import 'reflect-metadata';
import { validateCompanyDataDto } from './company-data-validator';
import { CountryEnum } from '../dtos/country.dto';
import { LanguageEnum } from '../enums/language.enum';

describe('CompanyDataDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      id: '123',
      name: 'Test Company',
      emails: ['test@example.com'],
      invoiceEmail: 'invoice@example.com',
      privacyPolicyUrl: 'https://example.com/privacy',
      defaultLanguage: LanguageEnum.EN,
      languages: [LanguageEnum.EN, LanguageEnum.FR],
      telephone: '+12133734253',
      address1: '123 Main St',
      postcode: '12345',
      city: 'Test City',
      country: CountryEnum.UNITED_STATES,
    };

    const errors = validateCompanyDataDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error when required fields are missing', () => {
    const invalidDto = {
      // Missing required fields
    };

    const errors = validateCompanyDataDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'id')).toBe(true);
    expect(errors.some((e) => e.property === 'name')).toBe(true);
  });

  it('should return error for invalid email format', () => {
    const invalidDto = {
      id: '123',
      name: 'Test Company',
      emails: ['not-an-email'],
      invoiceEmail: 'invoice@example.com',
      privacyPolicyUrl: 'http://example.com/privacy',
      defaultLanguage: LanguageEnum.EN,
      languages: [LanguageEnum.EN, LanguageEnum.FR],
      telephone: '+12133734253',
      address1: '123 Main St',
      postcode: '12345',
      city: 'Test City',
      country: CountryEnum.UNITED_STATES,
    };

    const errors = validateCompanyDataDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'emails')).toBe(true);
  });

  it('should return error for invalid URL format', () => {
    const invalidDto = {
      id: '123',
      name: 'Test Company',
      emails: ['test@example.com'],
      invoiceEmail: 'invoice@example.com',
      privacyPolicyUrl: 'not-a-url',
      defaultLanguage: LanguageEnum.EN,
      languages: [LanguageEnum.EN, LanguageEnum.FR],
      telephone: '+12133734253',
      address1: '123 Main St',
      postcode: '12345',
      city: 'Test City',
      country: CountryEnum.UNITED_STATES,
    };

    const errors = validateCompanyDataDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'privacyPolicyUrl')).toBe(true);
  });
});
