import { registerDecorator, ValidationOptions } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsE164(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isE164',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') return false;
          if (value.trim().length === 0) return false;
          const parsed = parsePhoneNumberFromString(value);
          if (!parsed) return false;
          return parsed.format('E.164') === value;
        },
        defaultMessage() {
          return '$property must be a valid E.164 phone number (e.g. +14155552671)';
        },
      },
    });
  };
}
