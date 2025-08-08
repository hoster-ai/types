import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  function isNonEmptyObjectOrArray(value: unknown): boolean {
    if (Array.isArray(value)) return value.length > 0;
    if (value && typeof value === 'object') return Object.keys(value).length > 0;
    return false;
  }
  
  @ValidatorConstraint({ name: 'AtLeastOneNonEmpty', async: false })
  class AtLeastOneNonEmptyConstraint implements ValidatorConstraintInterface {
    validate(_: any, args: ValidationArguments) {
      const object = args.object as Record<string, any>;
      const keys = args.constraints[0] as string[];
  
      return keys.some(key => isNonEmptyObjectOrArray(object[key]));
    }
  
    defaultMessage(args: ValidationArguments) {
      const keys = args.constraints[0] as string[];
      return `At least one of the following must be non-empty: ${keys.join(', ')}`;
    }
  }

  
  
  export function AtLeastOneNonEmptyClass(
    keys: string[],
    validationOptions?: ValidationOptions,
  ) {
    return function (constructor: Function) {
      registerDecorator({
        name: 'AtLeastOneNonEmpty',
        target: constructor,
        propertyName: "",
        options: validationOptions,
        constraints: [keys],
        validator: AtLeastOneNonEmptyConstraint,
      });
    };
  }
  