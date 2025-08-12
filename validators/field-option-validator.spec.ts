import { validateFieldOptionDto } from "./field-option.validator";

describe('validateFieldOptionDto', () => {
  test.each([
    // valid
    [{ key: 'option1', value: 'Option 1' }, true],
    [{ key: 'option2', value: 'Option 2', disabled: true }, true],
    [{ key: 'option3', value: 'Option 3', disabled: false }, true],
    
    // missing required
    [{ value: 'Missing key' }, false],
    [{ key: 'missingValue' }, false],
    
    // wrong types
    [{ key: 123, value: 'Valid string' }, false],
    [{ key: 'validKey', value: 456 }, false],
    [{ key: 'key', value: 'value', disabled: 'yes' }, false],
    
    // disabled optional omitted
    [{ key: 'noDisabled', value: 'Yes' }, true],
  ])('validates %# - %# %#', (input, expectedValid) => {
    const errors = validateFieldOptionDto(input);
    if (expectedValid) {
      expect(errors.length).toBe(0);
    } else {
      expect(errors.length).toBeGreaterThan(0);
    }
  });
});
