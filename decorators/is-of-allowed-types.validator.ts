import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

type AllowedPrimitive = 'string' | 'number' | 'boolean';
type AllowedType = AllowedPrimitive | 'object' | 'array';

interface IsOfAllowedTypesOptions {
  objectClass?: new (...args: any[]) => any;
  arrayElementClass?: new (...args: any[]) => any;
  require?: boolean;
  objectNotEmpty?: boolean;
  arrayNotEmpty?: boolean;
  stringPattern?: RegExp;
}

// Overloads
export function IsOfAllowedTypes(types: AllowedType[]): PropertyDecorator;
export function IsOfAllowedTypes(types: AllowedType[], options: IsOfAllowedTypesOptions): PropertyDecorator;
export function IsOfAllowedTypes(types: AllowedType[], validationOptions: ValidationOptions): PropertyDecorator;
export function IsOfAllowedTypes(types: AllowedType[], options: IsOfAllowedTypesOptions, validationOptions: ValidationOptions): PropertyDecorator;

// Implementation
export function IsOfAllowedTypes(
  types: AllowedType[],
  optionsOrValidationOptions?: IsOfAllowedTypesOptions | ValidationOptions,
  validationOptions?: ValidationOptions
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol) {
    let options: IsOfAllowedTypesOptions = {};
    let finalValidationOptions: ValidationOptions | undefined;

    if (optionsOrValidationOptions) {
      if (
        'objectClass' in optionsOrValidationOptions ||
        'arrayElementClass' in optionsOrValidationOptions ||
        'require' in optionsOrValidationOptions ||
        'objectNotEmpty' in optionsOrValidationOptions ||
        'arrayNotEmpty' in optionsOrValidationOptions ||
        'stringPattern' in optionsOrValidationOptions
      ) {
        options = optionsOrValidationOptions as IsOfAllowedTypesOptions;
        finalValidationOptions = validationOptions;
      } else {
        finalValidationOptions = optionsOrValidationOptions as ValidationOptions;
      }
    }

    registerDecorator({
      name: 'isOfAllowedTypes',
      target: target.constructor,
      propertyName: propertyKey.toString(),
      constraints: [types, options],
      options: finalValidationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [allowedTypes, opts] = args.constraints as [AllowedType[], IsOfAllowedTypesOptions];

          if (value === null || value === undefined) {
            return !opts.require;
          }

          for (const type of allowedTypes) {
            switch (type) {
              case 'string':
                if (typeof value === 'string') {
                  if (opts.require && value.trim().length === 0) return false;
                  if (opts.stringPattern && !opts.stringPattern.test(value)) return false;
                  return true;
                }
                break;
              case 'number':
                if (typeof value === 'number') return true;
                break;
              case 'boolean':
                if (typeof value === 'boolean') return true;
                break;
              case 'object':
                if (
                  typeof value === 'object' &&
                  !Array.isArray(value) &&
                  (!opts.objectClass || value instanceof opts.objectClass)
                ) {
                  if (opts.objectNotEmpty && Object.keys(value).length === 0) {
                    return false;
                  }
                  return true;
                }
                break;
              case 'array':
                if (
                  Array.isArray(value) &&
                  (!opts.arrayElementClass ||
                    value.every((item) => item instanceof (opts.arrayElementClass as new (...args: any[]) => any)))
                ) {
                  if (opts.arrayNotEmpty && value.length === 0) {
                    return false;
                  }
                  return true;
                }
                break;
            }
          }

          return false;
        },

        defaultMessage(args: ValidationArguments) {
          const [allowedTypes, opts] = args.constraints as [AllowedType[], IsOfAllowedTypesOptions];
          const messages = [];

          if (opts.require) {
            messages.push('is required');
          }

          if (allowedTypes.includes('string')) {
            if (opts.require) messages.push('must be a non-empty string');
            if (opts.stringPattern) messages.push(`must match pattern ${opts.stringPattern}`);
          }

          if (allowedTypes.includes('array') && opts.arrayNotEmpty) {
            messages.push('must be a non-empty array');
          }

          if (allowedTypes.includes('object') && opts.objectNotEmpty) {
            messages.push('must be a non-empty object');
          }

          if (messages.length === 0) {
            messages.push(`must be one of: ${allowedTypes.join(', ')}`);
          }

          return `${args.property} ${messages.join(' and ')}`;
        },
      },
    });
  };
}
