import 'reflect-metadata';
import { validateClientDataDto } from './client-data-validator';
import { CountryEnum } from '../dtos/country.dto';

describe('validateClientDataDto', () => {
  it('should return no errors for a valid client data object', async () => {
    const validClientData = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      telephone: '+14155552671',
      address1: '123 Main St',
      postcode: '12345',
      city: 'Anytown',
      country: CountryEnum.UNITED_STATES,
    };

    const errors = await validateClientDataDto(validClientData);
    expect(errors.length).toBe(0);
  });

  it('should return errors for an invalid client data object', async () => {
    const invalidClientData = {
      email: 'not-an-email',
      firstName: '', // empty
      lastName: 'Doe',
      telephone: '123', // invalid
      address1: '123 Main St',
      postcode: '12345',
      city: 'Anytown',
      country: 'invalid-country',
    };

    const errors = await validateClientDataDto(invalidClientData);
    expect(errors.length).toBeGreaterThan(0);
  });
});
