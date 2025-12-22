import { COUNTRY_DATA, CountryDto, CountryEnum, EUROZONE_COUNTRIES } from "../enums/country.enum";

export function getCountryData(code: CountryEnum): CountryDto {
    return COUNTRY_DATA[code];
}

export function getAllCountriesData(): CountryDto[] {
    return Object.values(COUNTRY_DATA)
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function getEuropeanCountriesData(): Record<CountryEnum, CountryDto> {
    return Object.fromEntries(
        Object.entries(COUNTRY_DATA).filter(([, country]) => country.isEurope),
    ) as Record<CountryEnum, CountryDto>;
}

export function getEurozineCountriesData(): Record<CountryEnum, CountryDto> {
    return Object.fromEntries(
        Object.entries(COUNTRY_DATA).filter(([code]) =>
            EUROZONE_COUNTRIES.has(code as CountryEnum),
        ),
    ) as Record<CountryEnum, CountryDto>;
}