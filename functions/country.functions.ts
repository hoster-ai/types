import { COUNTRIES } from "../constants/countries.const";
import { CountryDto } from "../dtos/country.dto";


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