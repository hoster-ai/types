import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPlainObject(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPlainObject',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (value === null || typeof value !== 'object' || value.constructor !== Object) {
            return false;
          }
          for (const key in value) {
            if (typeof key !== 'string' || typeof value[key] === 'function') {
              return false;
            }
          }
          return true;
        },
        defaultMessage(_args: ValidationArguments) {
          return '$property must be a plain object with key-value pairs';
        },
      },
    });
  };
}
