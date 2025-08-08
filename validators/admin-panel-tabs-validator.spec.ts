import 'reflect-metadata';
import { validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { AdminPanelTabsDto } from '../dtos/admin-panel.dto';

describe('validateAdminPanelTabsDto', () => {
  const validTab = { label: 'Tab', url: 'https://example.com' };

  const cases: [any, boolean][] = [
    [{ product: [], item: [], client: [], user: [], order: [] }, false], // all empty => invalid
    [{ product: [validTab], item: [validTab], client: [validTab], user: [validTab], order: [validTab] }, true],
    [{ product: [], item: [], client: [], user: [] }, false], // missing order
    [{ product: [], item: 'not-an-array', client: [], user: [], order: [] }, false],
    [{ product: [{ label: 123, url: 'invalid-url' }], item: [], client: [], user: [], order: [] }, false],
    [{ product: [{ label: 123, url: 'invalid-url' }], item: [], client: [], user: [], order: [] }, false],
  ];

  test.each(cases)('validates %# as %s', (input, valid) => {
    const dto = plainToInstance(AdminPanelTabsDto, input);
    const errors = validateSync(dto, { whitelist: true, forbidNonWhitelisted: true });
    
    const classLevelError = errors.find(e => e.property === '');
    const hasClassLevelError = classLevelError !== undefined;
  
    if (valid) {
      expect(errors.length).toBe(0);
    } else {
      expect(errors.length).toBeGreaterThan(0);
      if (hasClassLevelError) {
        expect(classLevelError!.constraints).toHaveProperty('AtLeastOneNonEmpty');
      }
    }
  });
});
