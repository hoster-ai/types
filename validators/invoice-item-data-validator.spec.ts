import 'reflect-metadata';
import { validateInvoiceItemDataDto } from './invoice-item-data-validator';
import { InvoiceItemActionsEnum } from '../enums/invoice/invoice-item-actions.enum';

const baseValidDto = {
  productId: 'prod-123',
  productName: 'Web Hosting',
  resourceName: 'hosting-basic',
  productAttributes: { plan: 'basic' },
  itemAttributes: { domain: 'example.com' },
  startDate: '2025-01-01',
  endDate: '2025-12-31',
  action: InvoiceItemActionsEnum.CREATE,
};

describe('InvoiceItemDataDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateInvoiceItemDataDto(baseValidDto)).toHaveLength(0);
    });

    it.each(Object.values(InvoiceItemActionsEnum))('should accept action %s', (action) => {
      const dto = { ...baseValidDto, action };
      expect(validateInvoiceItemDataDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return error when action is missing', () => {
      const { action, ...dto } = baseValidDto;
      const errors = validateInvoiceItemDataDto(dto);
      expect(errors.some(e => e.property === 'action')).toBe(true);
    });

    it('should return errors for inherited required fields when missing', () => {
      const errors = validateInvoiceItemDataDto({});
      expect(errors.some(e => e.property === 'action')).toBe(true);
      expect(errors.some(e => e.property === 'productId')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid action enum', () => {
      const dto = { ...baseValidDto, action: 'invalid-action' };
      const errors = validateInvoiceItemDataDto(dto);
      expect(errors.some(e => e.property === 'action')).toBe(true);
    });
  });
});
