import { COUNTRIES, EU_EEA_COUNTRIES, GEOGRAPHIC_EUROPEAN_COUNTRIES } from "../constants/countries.const";
import { CountryDto } from "../dtos/country.dto";

/**
 * Create a CountryDto object
 * @param name Country name
 * @param code Country code
 * @returns CountryDto object
 */
export function createCountry(name: string, code: string): CountryDto {
  return {
    name,
    code,
    isEurope: EU_EEA_COUNTRIES.has(code) || code === 'UK'
  };
}
/**
 * Get all European countries from the COUNTRIES constant
 * @returns Record of European country codes to Country objects
 */
export function getEuropeanCountriesDtos(): CountryDto[] {
  return Object.values(COUNTRIES).filter((country) => country.isEurope);
}

/**
 * Get all countries from the COUNTRIES constant
 * @returns Record of country codes to Country objects
 */
export function getAllCountriesDtos(): CountryDto[] {
  return Object.values(COUNTRIES);
}