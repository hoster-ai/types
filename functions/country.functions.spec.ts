import 'reflect-metadata';
import { getAllCountriesDtos, getEuropeanCountriesDtos } from './country.functions';
import { getCountryDto } from '../constants/countries.const';

describe('getCountryDto', () => {
  it('should mark EU/EEA country codes as European', () => {
    const country = getCountryDto('Germany', 'DE');
    expect(country).toEqual({
      name: 'Germany',
      code: 'DE',
      isEurope: true,
    });
  });

  it('should be case-insensitive when determining Europe membership', () => {
    const country = getCountryDto('Germany', 'de');
    expect(country.isEurope).toBe(true);
    expect(country.code).toBe('de');
  });

  it('should mark non-EU/EEA country codes as not European', () => {
    const country = getCountryDto('United States', 'US');
    expect(country.isEurope).toBe(false);
  });

  it("should treat 'UK' and 'GB' as European", () => {
    expect(getCountryDto('United Kingdom', 'UK').isEurope).toBe(true);
    expect(getCountryDto('United Kingdom', 'GB').isEurope).toBe(true);
  });

  it("should treat lowercase 'uk' and 'gb' as European", () => {
    expect(getCountryDto('United Kingdom', 'uk').isEurope).toBe(true);
    expect(getCountryDto('United Kingdom', 'gb').isEurope).toBe(true);
  });
});

describe('getEuropeanCountriesDtos', () => {
  it('should return only countries marked as European', () => {
    const europeanCountries = getEuropeanCountriesDtos();

    expect(europeanCountries.length).toBeGreaterThan(0);
    expect(europeanCountries.every(c => c.isEurope)).toBe(true);
  });

  it('should include known EU countries', () => {
    const codes = getEuropeanCountriesDtos().map(c => c.code);
    expect(codes).toContain('DE');
    expect(codes).toContain('FR');
    expect(codes).toContain('GR');
  });

  it('should not include non-European countries', () => {
    const codes = getEuropeanCountriesDtos().map(c => c.code);
    expect(codes).not.toContain('US');
    expect(codes).not.toContain('CN');
  });
});

describe('getAllCountriesDtos', () => {
  it('should return all countries', () => {
    const allCountries = getAllCountriesDtos();
    expect(allCountries.length).toBeGreaterThan(200);
  });

  it('should contain both European and non-European countries', () => {
    const codes = getAllCountriesDtos().map(c => c.code);
    expect(codes).toContain('DE');
    expect(codes).toContain('US');
  });
});
