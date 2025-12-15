import { COUNTRIES, EU_EEA_COUNTRIES } from "../constants/countries.const";
import { CountryDto } from "../dtos/country.dto";

/**
 * Get all European countries from the COUNTRIES object
 * @returns Record of European country codes to Country objects
 */
export function getEuropeanCountriesDtos(): CountryDto[] {
  return Object.values(COUNTRIES).filter((country) => country.isEurope);
}

export function getAllCountriesDtos(): CountryDto[] {
  return Object.values(COUNTRIES);
}