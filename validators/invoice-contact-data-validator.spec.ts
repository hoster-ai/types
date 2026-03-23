import 'reflect-metadata';
import { validateInvoiceContactDataDto } from './invoice-contact-data-validator';
import { CountryEnum } from '../enums/country.enum';

const baseValidDto = {
  invoiceContactId: 'ic-001',
  isBusinessContact: false,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  telephone: '+14155552671',
  address1: '123 Main St',
  postcode: '12345',
  city: 'Anytown',
  country: CountryEnum.UNITED_STATES,
};

describe('InvoiceContactData Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO', () => {
      expect(validateInvoiceContactDataDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors for a business contact with all optional fields', () => {
      const dto = {
        ...baseValidDto,
        isBusinessContact: true,
        businessName: 'Acme Corp',
        mobile: '+14155552672',
        address2: 'Suite 100',
        address3: 'Building A',
        state: 'California',
        tin: 'US123456789',
        taxOffice: 'IRS',
        profession: 'Software Development',
      };
      expect(validateInvoiceContactDataDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateInvoiceContactDataDto({});
      const requiredProps = [
        'invoiceContactId',
        'isBusinessContact',
        'firstName',
        'lastName',
        'email',
        'telephone',
        'address1',
        'postcode',
        'city',
        'country',
      ];
      for (const prop of requiredProps) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });

    it('should return error when invoiceContactId is missing', () => {
      const { invoiceContactId, ...dto } = baseValidDto;
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'invoiceContactId')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for invalid email', () => {
      const dto = { ...baseValidDto, email: 'not-an-email' };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'email')).toBe(true);
    });

    it('should return error for invalid telephone', () => {
      const dto = { ...baseValidDto, telephone: '123' };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'telephone')).toBe(true);
    });

    it('should return error for invalid country code', () => {
      const dto = { ...baseValidDto, country: 'INVALID' };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'country')).toBe(true);
    });

    it('should return error for address1 exceeding max length', () => {
      const dto = { ...baseValidDto, address1: 'a'.repeat(251) };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'address1')).toBe(true);
    });

    it('should return error for postcode exceeding max length', () => {
      const dto = { ...baseValidDto, postcode: '1'.repeat(17) };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'postcode')).toBe(true);
    });

    it('should return error for invalid mobile phone', () => {
      const dto = { ...baseValidDto, mobile: 'not-a-phone' };
      const errors = validateInvoiceContactDataDto(dto);
      expect(errors.some((e) => e.property === 'mobile')).toBe(true);
    });
  });
});
