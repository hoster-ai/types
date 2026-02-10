import 'reflect-metadata';
import { validateItemDataDto } from './item-data-validator';

const baseValidDto = {
  productId: 'prod-123',
  productName: 'Web Hosting',
  resourceName: 'hosting-basic',
  productAttributes: { plan: 'basic' },
  itemAttributes: { domain: 'example.com' },
  startDate: '2025-01-01',
  endDate: '2025-12-31',
};

describe('ItemDataDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateItemDataDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with optional fields', () => {
      const dto = {
        ...baseValidDto,
        itemId: 'item-456',
        creationResponseData: { externalId: 'ext-1' },
        price: 9.99,
        discountPrice: 7.99,
      };
      expect(validateItemDataDto(dto)).toHaveLength(0);
    });

    it('should return no errors when optional fields are omitted', () => {
      expect(validateItemDataDto(baseValidDto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateItemDataDto({});
      const requiredProps = ['productId', 'productName', 'resourceName', 'productAttributes', 'itemAttributes', 'startDate', 'endDate'];
      for (const prop of requiredProps) {
        expect(errors.some(e => e.property === prop)).toBe(true);
      }
    });

    it('should return error when productId is missing', () => {
      const { productId, ...dto } = baseValidDto;
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'productId')).toBe(true);
    });

    it('should return error when productAttributes is missing', () => {
      const { productAttributes, ...dto } = baseValidDto;
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'productAttributes')).toBe(true);
    });

    it('should return error when itemAttributes is missing', () => {
      const { itemAttributes, ...dto } = baseValidDto;
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'itemAttributes')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty productId', () => {
      const dto = { ...baseValidDto, productId: '' };
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'productId')).toBe(true);
    });

    it('should return error for empty startDate', () => {
      const dto = { ...baseValidDto, startDate: '' };
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'startDate')).toBe(true);
    });

    it('should return error for non-number price', () => {
      const dto = { ...baseValidDto, price: 'free' };
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'price')).toBe(true);
    });

    it('should return error for non-number discountPrice', () => {
      const dto = { ...baseValidDto, discountPrice: 'half-off' };
      const errors = validateItemDataDto(dto);
      expect(errors.some(e => e.property === 'discountPrice')).toBe(true);
    });
  });
});
