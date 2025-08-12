import 'reflect-metadata';
import { validateSettingsWithUrlDto } from './settings-with-url.validator';

describe('SettingsWithUrlDto', () => {
  it.each([
    // valid
    [{ url: 'https://valid.com', label: 'Test', icon: 'https://icon.com', description: 'Test' }, 0],

    // invalid URL
    [{ url: 'not-a-url', label: 'Test', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ url: 'ftp://wrongprotocol.com', label: 'Test', icon: 'https://icon.com', description: 'Test' }, 1],

    // missing URL
    [{ label: 'Missing URL', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ url: '', label: 'Empty URL', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ url: null, label: 'Null URL', icon: 'https://icon.com', description: 'Test' }, 1],

    // missing Name
    [{ url: 'https://valid.com', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ url: 'https://valid.com', label: '', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ url: 'https://valid.com', label: null, icon: 'https://icon.com', description: 'Test' }, 1],

    // missing both link and icon
    [{ label: 'Missing URL', description: 'Test' }, 2],

    // null both
    [{ url: null, label: null, icon: 'https://icon.com', description: 'Test' }, 2],

    // extra unexpected field should still pass base validation?
    [{ url: 'https://valid.com', label: 'Test', icon: 'https://icon.com', description: 'Test', extra: 'field' }, 0],
  ])('validates %# -> %s errors', (input, expectedCount) => {
    expect(validateSettingsWithUrlDto(input)).toHaveLength(expectedCount);
  });
});
