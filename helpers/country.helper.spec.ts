import {
  getCountryData,
  getAllCountriesData,
  getEuropeanCountriesData,
  getEurozoneCountriesData,
} from './country.helper';
import {
  COUNTRY_DATA,
  CountryEnum,
  EU_EEA_COUNTRIES,
  EUROZONE_COUNTRIES,
} from '../enums/country.enum';

describe('country.helper', () => {
  it('επιστρέφει το σωστό CountryDto για συγκεκριμένο code', () => {
    const result = getCountryData(CountryEnum.GREECE);

    expect(result).toEqual(COUNTRY_DATA[CountryEnum.GREECE]);
    expect(result.isEurope).toBe(true);
  });

  it('επιστρέφει όλες τις χώρες ταξινομημένες αλφαβητικά', () => {
    const result = getAllCountriesData();
    const expectedLength = Object.keys(COUNTRY_DATA).length;

    expect(result).toHaveLength(expectedLength);

    const names = result.map((country) => country.name);
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  });

  it('επιστρέφει μόνο τις ευρωπαϊκές χώρες (EU/EEA)', () => {
    const europeanData = getEuropeanCountriesData();

    expect(Object.keys(europeanData)).toHaveLength(EU_EEA_COUNTRIES.size);

    for (const code of EU_EEA_COUNTRIES) {
      const dto = europeanData[code];
      expect(dto).toBeDefined();
      expect(dto.isEurope).toBe(true);
    }

    expect(europeanData[CountryEnum.UNITED_STATES]).toBeUndefined();
  });

  it('επιστρέφει μόνο τις χώρες της ευρωζώνης', () => {
    const eurozoneData = getEurozoneCountriesData();

    expect(Object.keys(eurozoneData)).toHaveLength(EUROZONE_COUNTRIES.size);
    expect(eurozoneData[CountryEnum.GERMANY]).toBeDefined();
    expect(eurozoneData[CountryEnum.SWEDEN]).toBeUndefined();
  });
});
