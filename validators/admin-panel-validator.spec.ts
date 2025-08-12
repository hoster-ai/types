import 'reflect-metadata';
import { MenuDtoWithSubmenu, MenuDtoWithUrl } from '../dtos/menu.dto';
import { SettingsWithTabsDto, SettingsWithUrlDto } from '../dtos/settings.dto';
import { validateAdminPanelDto } from './admin-panel.validator';

const validAction = { icon: 'add', openMethod: 'ajax_call', url: 'https://example.com/action' };

const minimalValidMenuDtoWithUrl: MenuDtoWithUrl = {
  type: 'only-url',
  icon: 'https://example.com/icon.png',
  label: 'Main Menu',
  url: 'https://example.com/menu',
};

const minimalValidMenuDtoWithSubmenu: MenuDtoWithSubmenu = {
  type: 'with-submenu',
  icon: 'https://example.com/icon.png',
  label: 'Main Menu',
  submenu: [
    { url: 'https://example.com/sub1', label: 'Submenu 1' },
    { url: 'https://example.com/sub2', label: 'Submenu 2' },
  ],
};

const minimalValidSettingsWithUrlDto: SettingsWithUrlDto = {
  url: 'https://settings.com',
  label: 'Settings',
  icon: 'https://example.com/icon.png',
  description: 'Settings description',
};

const minimalValidSettingsWithTabsDto: SettingsWithTabsDto = {
  tabs: [
    {
      label: 'Tab 1',
      url: 'https://example.com/tab1',
    },
  ],
  label: 'Settings',
  icon: 'https://example.com/icon.png',
  description: 'Settings description',
};

describe('AdminPanelDto full validation', () => {
  test.each([
    // Empty object is invalid
    ['valid minimal empty object', {}, false],

    // Tabs tests
    ['invalid all empty tabs and empty moreActions', {
      tabs: { product: [], item: [], client: [], user: [], order: [] },
      moreActions: {},
    }, false],

    ['valid with one non-empty tab', {
      tabs: { product: [{ label: 'Product', url: 'https://example.com/product' }] },
    }, true],
    ['invalid with one non-empty tab', {
      tabs: { product: [{ label: 'Product', url: 'https://example.com/product' }], item: [], client: [], user: [], order: [] },
    }, false],

    ['invalid with multiple non-empty tabs', {
      tabs: {
        product: [{ label: 'Product', url: 'https://example.com/product' }],
        item: [{ label: 'Item', url: 'https://example.com/item' }],
        client: [],
        user: [],
        order: [],
      },
    }, false],
    ['valid with multiple non-empty tabs', {
      tabs: {
        product: [{ label: 'Product', url: 'https://example.com/product' }],
        item: [{ label: 'Item', url: 'https://example.com/item' }],
      },
    }, true],

    // MoreActions tests
    ['valid with moreActions.client', { moreActions: { client: [validAction] } }, true],
    ['valid with moreActions.item', { moreActions: { item: [validAction] } }, true],
    ['valid with moreActions.invoice', { moreActions: { invoice: [validAction] } }, true],
    ['valid with moreActions.order', { moreActions: { order: [validAction] } }, true],
    ['valid with moreActions.user', { moreActions: { user: [validAction] } }, true],

    ['invalid moreActions.client with bad openMethod', { moreActions: { client: [{ icon: 'add', openMethod: 'bad_method', url: 'https://example.com/action' }] } }, false],

    // Menu and Settings valid combos
    ['valid menu with URL type', { menu: minimalValidMenuDtoWithUrl }, true],
    ['valid menu with submenu type', { menu: minimalValidMenuDtoWithSubmenu }, true],
    ['valid menu and settings URL', { menu: minimalValidMenuDtoWithUrl, settings: minimalValidSettingsWithUrlDto }, true],
    ['valid menu and settings tabs', { menu: minimalValidMenuDtoWithSubmenu, settings: minimalValidSettingsWithTabsDto }, true],

    // Invalid menu cases
    ['invalid menu missing required fields', { menu: { type: 'only-url' } }, false],
    ['invalid menu unknown type', { menu: { type: 'unknown' as any, icon: 'https://icon.png', label: 'Label', url: 'https://example.com' } as MenuDtoWithUrl }, false],
    ['invalid menu with extra property', { menu: { ...minimalValidMenuDtoWithUrl, extra: 'not allowed' } }, false],
    ['invalid menu with submenu on URL menu', { menu: { ...minimalValidMenuDtoWithUrl, submenu: [{ url: 'https://example.com', label: 'Sub' }] } }, false],

    // Invalid tabs type
    ['invalid tabs not an object', { tabs: 'not-an-object' }, false],

    // Invalid extra property on root DTO
    ['invalid extra property on root', { extra: 'not allowed' }, false],

    // Settings validation edge cases
    ['valid settings with SettingsWithUrlDto', { settings: minimalValidSettingsWithUrlDto }, true],
    ['valid settings with SettingsWithTabsDto', { settings: minimalValidSettingsWithTabsDto }, true],
    ['invalid settings missing required fields', { settings: { label: 'Missing url and tabs' } }, false],
    ['invalid settings with extra property', { settings: { ...minimalValidSettingsWithUrlDto, extra: 'not allowed' } }, false],
    ['invalid settings with both url and tabs', {
      settings: {
        url: 'https://example.com',
        tabs: [{ label: 'Tab 1', url: 'https://example.com/tab1' }],
        label: 'Invalid Union',
        icon: 'https://example.com/icon.png',
        description: 'Should fail because both url and tabs are present',
      },
    }, false],
  ])('%s', async (_desc, input, expectedValid) => {
    const errors = await validateAdminPanelDto(input);
    if (expectedValid) {
      expect(errors.length).toBe(0);
    } else {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
