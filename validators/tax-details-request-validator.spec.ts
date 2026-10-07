import 'reflect-metadata';
import { validateTaxDetailsRequestDto } from './tax-details-request-validator';
import { CountryEnum } from '../enums/country.enum';

describe('validateTaxDetailsRequestDto', () => {
  const REQUEST = {
    sellerCountry: CountryEnum.GREECE,
    buyerCountry: CountryEnum.GERMANY,
    isBusinessContact: false,
  };

  it('accepts a minimal request', () => {
    expect(validateTaxDetailsRequestDto(REQUEST)).toEqual([]);
  });

  it('rejects a request without countries', () => {
    expect(
      validateTaxDetailsRequestDto({ isBusinessContact: false })
        .map((e) => e.property)
        .sort(),
    ).toEqual(['buyerCountry', 'sellerCountry']);
  });
});
