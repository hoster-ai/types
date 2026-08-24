import {
  getAllCurrenciesMetadata,
  getCurrencyMetadata,
} from './currency.helper';
import { CURRENCY_CATALOG, CurrencyEnum } from '../enums/currency.enum';

const RETIRED_CURRENCY_CODES = [
  'EEK',
  'LTL',
  'LVL',
  'HRK',
  'VEF',
  'ZMK',
  'ZWL',
];

describe('currency.enum', () => {
  const allCodes = Object.values(CurrencyEnum);

  it('περιέχει το πλήρες ενεργό σετ ISO 4217 (115 κωδικοί)', () => {
    expect(Object.keys(CurrencyEnum)).toHaveLength(115);
  });

  it('κάθε member έχει τιμή ίδια με το όνομά του', () => {
    for (const [key, value] of Object.entries(CurrencyEnum)) {
      expect(value).toBe(key);
    }
  });

  it('δεν περιέχει αποσυρμένους κωδικούς', () => {
    for (const code of RETIRED_CURRENCY_CODES) {
      expect(Object.keys(CurrencyEnum)).not.toContain(code);
    }
  });

  it('το CURRENCY_CATALOG καλύπτει κάθε member του CurrencyEnum ακριβώς μία φορά', () => {
    const catalogCodes = Object.keys(CURRENCY_CATALOG);

    expect(catalogCodes).toHaveLength(allCodes.length);
    expect([...catalogCodes].sort()).toEqual([...allCodes].sort());
  });

  it('το CURRENCY_CATALOG δεν περιέχει αποσυρμένους κωδικούς', () => {
    for (const code of RETIRED_CURRENCY_CODES) {
      expect(Object.keys(CURRENCY_CATALOG)).not.toContain(code);
    }
  });

  it('κάθε entry έχει μη κενό name και symbol', () => {
    for (const code of allCodes) {
      const metadata = CURRENCY_CATALOG[code];

      expect(metadata).toBeDefined();
      expect(typeof metadata.name).toBe('string');
      expect(metadata.name.trim()).not.toBe('');
      expect(typeof metadata.symbol).toBe('string');
      expect(metadata.symbol.trim()).not.toBe('');
    }
  });

  it('κάθε entry έχει code ίδιο με το key του', () => {
    for (const code of allCodes) {
      expect(CURRENCY_CATALOG[code].code).toBe(code);
    }
  });

  it.each([
    [CurrencyEnum.EUR, 'Euro', '€'],
    [CurrencyEnum.USD, 'U.S. Dollar', '$'],
    [CurrencyEnum.GBP, 'British Pound', '£'],
    [CurrencyEnum.VES, 'Venezuelan Bolívar', 'Bs.'],
    [CurrencyEnum.ZMW, 'Zambian Kwacha', 'ZK'],
    [CurrencyEnum.ZWG, 'Zimbabwe Gold', 'ZiG'],
  ])('έχει τα σωστά metadata για το %s', (code, name, symbol) => {
    expect(CURRENCY_CATALOG[code]).toEqual({ name, symbol, code });
  });
});

describe('currency.helper', () => {
  const allCodes = Object.values(CurrencyEnum);

  it('επιστρέφει το σωστό CurrencyMetadata για συγκεκριμένο code', () => {
    const result = getCurrencyMetadata(CurrencyEnum.EUR);

    expect(result).toEqual(CURRENCY_CATALOG[CurrencyEnum.EUR]);
    expect(result.code).toBe(CurrencyEnum.EUR);
  });

  it('επιστρέφει όλα τα νομίσματα ταξινομημένα αλφαβητικά κατά name', () => {
    const result = getAllCurrenciesMetadata();

    const entries = Object.entries(result);
    expect(entries).toHaveLength(allCodes.length);

    const names = entries.map(([, metadata]) => metadata.name);
    const sortedNames = [...names].sort((a, b) => a.localeCompare(b));

    expect(names).toEqual(sortedNames);
  });

  it('κάθε στοιχείο που επιστρέφεται μεταφέρει και τον code του', () => {
    const result = getAllCurrenciesMetadata();

    for (const [key, metadata] of Object.entries(result)) {
      expect(metadata.code).toBe(key);
    }
  });
});
