import 'reflect-metadata';
import { validateMenuWithUrlDto } from './menu-with-url.validator';

describe('validateMenuWithUrlDto', () => {
  it('passes with valid minimal object', () => {
    const data = {
      type: 'only-url',
      icon: 'https://example.com/icon.png',
      label: 'Dashboard',
      url: 'https://example.com/page',
    };
    const errors = validateMenuWithUrlDto(data);
    expect(errors.length).toBe(0);
  });

  it('fails if type is incorrect', () => {
    const data = {
      type: 'invalid-type',
      icon: 'https://example.com/icon.png',
      label: 'Dashboard',
      url: 'https://example.com/page',
    };
    const errors = validateMenuWithUrlDto(data);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.constraints?.isIn)).toBe(true);
  });

  it('fails if icon is not a string', () => {
    const data = {
      type: 'only-url',
      icon: 12345, // not a string
      label: 'Dashboard',
      url: 'https://example.com/page',
    };
    const errors = validateMenuWithUrlDto(data);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.constraints?.isString)).toBe(true);
  });

  it('fails if label is missing', () => {
    const data = {
      type: 'only-url',
      icon: 'https://example.com/icon.png',
      url: 'https://example.com/page',
    };
    const errors = validateMenuWithUrlDto(data);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.constraints?.isNotEmpty)).toBe(true);
  });

  it('fails if url is missing or invalid', () => {
    const invalids = [
      { type: 'only-url', icon: 12345, label: 'Dashboard' }, // icon not a string
      { type: 'only-url', icon: 'https://example.com/icon.png', label: 'Dashboard', url: 'invalid-url' },
    ];
    for (const data of invalids) {
      const errors = validateMenuWithUrlDto(data);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some(e => e.constraints?.isUrl || e.constraints?.isString || e.constraints?.isDefined)).toBe(true);
    }
  });

  it('fails if submenu is present', () => {
    const data = {
      type: 'only-url',
      icon: 'https://example.com/icon.png',
      label: 'Dashboard',
      url: 'https://example.com/page',
      submenu: [],
    };
    const errors = validateMenuWithUrlDto(data);
    expect(errors.length).toBeGreaterThan(0);
  });
});
