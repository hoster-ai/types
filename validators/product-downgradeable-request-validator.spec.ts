import 'reflect-metadata';
import { validateProductDowngradableRequestDto } from './product-downgradable-request-validator';
import { CountryEnum } from '../enums/country.enum';
import { DurationEnum } from '../enums/duration.enum';

describe('validateProductDowngradableRequestDto', () => {
  it('should return no errors for a valid request', async () => {
    const validRequest = {
      clientData: {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        telephone: '+14155552671',
        address1: '123 Main St',
        postcode: '12345',
        city: 'Anytown',
        country: CountryEnum.UNITED_STATES,
      },
      itemData: {
        itemId: 'item-123',
        productAttributes: { key: 'value' },
        itemAttributes: { key: 'value' },
        duration: DurationEnum.ONE_MONTH,
      },
    };

    const errors = await validateProductDowngradableRequestDto(validRequest);
    expect(errors.length).toBe(0);
  });

  it('should return errors for an invalid request', async () => {
    const invalidRequest = {
      clientData: {
        email: 'not-an-email',
      },
      itemData: {},
    };

    const errors = await validateProductDowngradableRequestDto(invalidRequest);
    expect(errors.length).toBeGreaterThan(0);
  });
});
