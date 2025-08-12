import 'reflect-metadata';
import { validateSettingsWithTabsDto } from './settings-with-tabs.validator';

describe('SettingsWithTabsDto', () => {
  it.each([
    // valid
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: 'Test', icon: 'https://icon.com', description: 'Test' }, 0],

    // invalid URL
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'not-a-url' }], label: 'Test', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'ftp://wrongprotocol.com' }], label: 'Test', icon: 'https://icon.com', description: 'Test' }, 1],

    // missing URL
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test' }], label: 'Missing URL', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test' }], label: 'Empty URL', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test' }], label: 'Null URL', icon: 'https://icon.com', description: 'Test' }, 1],

    // missing Name
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], icon: 'https://icon.com', description: 'Test' }, 1],
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: '', icon: 'https://icon.com', description: 'Test' }, 1],
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: null, icon: 'https://icon.com', description: 'Test' }, 1],

    // missing both link and icon
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: 'Missing URL', description: 'Test' }, 1],

    // null both
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: null, icon: null, description: 'Test' }, 2],

    // extra unexpected field should still pass base validation?
    [{ tabs: [{ label: 'Tab 1', icon: 'https://icon.com', description: 'Test', url: 'https://valid.com' }], label: 'Test', icon: 'https://icon.com', description: 'Test', extra: 'field' }, 0],
  ])('validates %# -> %s errors', (input, expectedCount) => {
    expect(validateSettingsWithTabsDto(input)).toHaveLength(expectedCount);
  });
});
