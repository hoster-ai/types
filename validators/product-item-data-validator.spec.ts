import 'reflect-metadata';
import { validateProductItemDataDto } from './product-item-data-validator';
import { ProductItemActionsEnum } from '../enums/item-actions.enum';

const baseValidDto = {
  productId: 'prod-123',
  productName: 'Web Hosting',
  resourceName: 'hosting-basic',
  productAttributes: { plan: 'basic' },
  itemAttributes: { domain: 'example.com' },
  startDate: '2025-01-01',
  endDate: '2025-12-31',
};

describe('ProductItemDataDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO without action', () => {
      expect(validateProductItemDataDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with a valid action', () => {
      const dto = { ...baseValidDto, action: ProductItemActionsEnum.CREATE };
      expect(validateProductItemDataDto(dto)).toHaveLength(0);
    });

    it.each(Object.values(ProductItemActionsEnum))('should accept action %s', (action) => {
      const dto = { ...baseValidDto, action };
      expect(validateProductItemDataDto(dto)).toHaveLength(0);
    });

    it('should return no errors with optional inherited fields', () => {
      const dto = {
        ...baseValidDto,
        itemId: 'item-456',
        price: 9.99,
        discountPrice: 7.99,
        action: ProductItemActionsEnum.RENEW,
      };
      expect(validateProductItemDataDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing inherited required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateProductItemDataDto({});
      const requiredProps = ['productId', 'productName', 'resourceName', 'productAttributes', 'itemAttributes', 'startDate', 'endDate'];
      for (const prop of requiredProps) {
        expect(errors.some(e => e.property === prop)).toBe(true);
      }
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid action enum', () => {
      const dto = { ...baseValidDto, action: 'invalid-action' };
      const errors = validateProductItemDataDto(dto);
      expect(errors.some(e => e.property === 'action')).toBe(true);
    });

    it('should return error for non-string action', () => {
      const dto = { ...baseValidDto, action: 123 };
      const errors = validateProductItemDataDto(dto);
      expect(errors.some(e => e.property === 'action')).toBe(true);
    });
  });
});
