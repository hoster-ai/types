import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsRegex(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isRegex',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          if (value.trim().length === 0) return false;
          try {
            new RegExp(value);
            return true;
          } catch {
            return false;
          }
        },
        defaultMessage() {
          return '$property must be a valid regular expression';
        },
      },
    });
  };
}
