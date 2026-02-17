import 'reflect-metadata';
import { validateTransactionDataDto } from './transaction-data-validator';

const baseValidDto = {
  transactionId: 'txn-001',
  amount: 99.99,
  paymentMethod: 'credit_card',
  date: new Date('2025-06-15T10:00:00Z'),
};

describe('TransactionData Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateTransactionDataDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with zero amount', () => {
      const dto = { ...baseValidDto, amount: 0 };
      expect(validateTransactionDataDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateTransactionDataDto({});
      const requiredProps = ['transactionId', 'amount', 'paymentMethod', 'date'];
      for (const prop of requiredProps) {
        expect(errors.some(e => e.property === prop)).toBe(true);
      }
    });

    it('should return error when transactionId is missing', () => {
      const { transactionId, ...dto } = baseValidDto;
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'transactionId')).toBe(true);
    });

    it('should return error when amount is missing', () => {
      const { amount, ...dto } = baseValidDto;
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'amount')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty transactionId', () => {
      const dto = { ...baseValidDto, transactionId: '' };
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'transactionId')).toBe(true);
    });

    it('should return error for non-number amount', () => {
      const dto = { ...baseValidDto, amount: 'free' };
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'amount')).toBe(true);
    });

    it('should return error for empty paymentMethod', () => {
      const dto = { ...baseValidDto, paymentMethod: '' };
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'paymentMethod')).toBe(true);
    });

    it('should return error for invalid date', () => {
      const dto = { ...baseValidDto, date: 'not-a-date' };
      const errors = validateTransactionDataDto(dto);
      expect(errors.some(e => e.property === 'date')).toBe(true);
    });
  });
});
