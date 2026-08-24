import {
  CURRENCY_CATALOG,
  CurrencyEnum,
  CurrencyMetadata,
} from '../enums/currency.enum';

export function getCurrencyMetadata(code: CurrencyEnum): CurrencyMetadata {
  return CURRENCY_CATALOG[code];
}

export function getAllCurrenciesMetadata(): Record<
  CurrencyEnum,
  CurrencyMetadata
> {
  return Object.fromEntries(
    Object.entries(CURRENCY_CATALOG).sort(([, a], [, b]) =>
      a.name.localeCompare(b.name),
    ),
  ) as Record<CurrencyEnum, CurrencyMetadata>;
}
