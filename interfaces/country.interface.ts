import { GEOGRAPHIC_EUROPEAN_COUNTRIES } from "../constants/countries.const";
import { CountryDto } from "../dtos/country.dto";

export function createCountry(name: string, code: string): CountryDto {
  return {
    name,
    code,
    isEurope: GEOGRAPHIC_EUROPEAN_COUNTRIES.has(code) || code === 'UK'
  };
}
