import 'reflect-metadata';
import { validateValidateAttributesRequestDto } from './product-validate-attributes-request-validator';

describe('validateValidateAttributesRequestDto', () => {
  it('should return no errors for a valid request', async () => {
    const validRequest = {
      triggeredByKey: 'some-key',
      attributeValues: {
        attribute1: 'value1',
        attribute2: 123,
      },
    };

    const errors =
      await validateValidateAttributesRequestDto(validRequest);
    expect(errors.length).toBe(0);
  });

  it('should return errors for an invalid request', async () => {
    const invalidRequest = {
      attributeValues: {
        attribute1: 'value1',
        attribute2: 123,
      },
    };

    const errors =
      await validateValidateAttributesRequestDto(invalidRequest);
    expect(errors.length).toBeGreaterThan(0);
  });
});
