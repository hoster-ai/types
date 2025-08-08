import 'reflect-metadata';
import { validateClientPanelDto } from './client-panel.validator'; // your validation function
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from '../dtos/menu.dto';

const validAction = { icon: 'add', openMethod: 'ajax_call', url: 'https://example.com/action' };

const minimalValidMenuDtoWithUrl: MenuDtoWithUrl = {
  type: 'only-url',
  icon: 'https://example.com/icon.png',
  label: 'Client Menu',
  url: 'https://example.com/menu',
};

const minimalValidMenuDtoWithSubmenu: MenuDtoWithSubmenu = {
  type: 'with-submenu',
  icon: 'https://example.com/icon.png',
  label: 'Client Menu',
  submenu: [
    { url: 'https://example.com/sub1', label: 'Submenu 1' },
    { url: 'https://example.com/sub2', label: 'Submenu 2' },
  ],
};

describe('ClientPanelDto full validation', () => {
  test.each([
    // Empty object is valid (all optional)
    ['valid minimal empty object', {}, true],

    // Tabs tests
    ['invalid empty tabs object', { tabs: {} }, false],
    ['invalid tabs with empty item array', { tabs: { item: [] } }, false],
    ['valid tabs with one item', { tabs: { item: [{ label: 'Tab 1', url: 'https://example.com/tab1' }] } }, true],

    // MoreActions tests
    ['invalid empty moreActions object', { moreActions: {} }, false],
    ['invalid moreActions with empty item array', { moreActions: { item: [] } }, false],
    ['valid moreActions with one item', { moreActions: { item: [validAction] } }, true],

    // Menu tests
    ['valid menu with URL type', { menu: minimalValidMenuDtoWithUrl }, true],
    ['valid menu with submenu type', { menu: minimalValidMenuDtoWithSubmenu }, true],
    ['invalid menu missing required fields', { menu: { type: 'only-url' } }, false],
    ['invalid menu unknown type', { menu: { type: 'unknown' as any, icon: 'https://icon.png', label: 'Label', url: 'https://example.com' } as MenuDtoWithUrl }, false],
    ['invalid menu with extra property', { menu: { ...minimalValidMenuDtoWithUrl, extra: 'not allowed' } }, false],
    ['invalid menu with submenu on URL menu', { menu: { ...minimalValidMenuDtoWithUrl, submenu: [{ url: 'https://example.com', label: 'Sub' }] } }, false],

    // Invalid extra property on root DTO
    ['invalid extra property on root', { extra: 'not allowed' }, false],
  ])('%s', async (_desc, input, expectedValid) => {
    const errors = await validateClientPanelDto(input);
    if (expectedValid) {
      expect(errors.length).toBe(0);
    } else {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
