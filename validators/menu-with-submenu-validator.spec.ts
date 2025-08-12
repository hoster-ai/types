import 'reflect-metadata';
import { validateMenuWithSubmenuDto } from './menu-with-submenu.validator';
describe('validateMenuDto', () => {
  test.each([
    ['valid data with submenu', 
      {
        type: 'with-submenu',
        icon: 'https://example.com/icon.png',
        label: 'Menu Label',
        submenu: [
          { label: 'Submenu 1', url: 'https://example.com/sub1' }
        ],
      },
      true
    ],
    ['missing required icon', 
      {
        type: 'with-submenu',
        label: 'Menu Label',
        submenu: [{ label: 'Submenu 1', url: 'https://example.com/sub1' }],
      },
      false
    ],
    ['missing submenu', 
      {
        type: 'with-submenu',
        icon: 'https://example.com/icon.png',
        label: 'Menu Label',
      },
      false
    ],
    ['submenu with missing label', 
      {
        type: 'with-submenu',
        icon: 'https://example.com/icon.png',
        label: 'Menu Label',
        submenu: [{ url: 'https://example.com/sub1' }],
      },
      false
    ],
  ])('%s', (_, input, expectedValid) => {
    const errors = validateMenuWithSubmenuDto(input);
    if (expectedValid) {
      expect(errors.length).toBe(0);
    } else {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
