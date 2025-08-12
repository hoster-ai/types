import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
  @ValidatorConstraint({ async: false })
  export class UniqueFieldInArrayConstraint implements ValidatorConstraintInterface {
    validate(value: any[], args: ValidationArguments) {
      if (!Array.isArray(value)) return true; // Let @IsArray handle wrong type
      const field = args.constraints[0];
      const seen = new Set();
      for (const obj of value) {
        if (obj && typeof obj === 'object' && obj[field] !== undefined) {
          if (seen.has(obj[field])) {
            return false;
          }
          seen.add(obj[field]);
        }
      }
      return true;
    }
  
    defaultMessage(args: ValidationArguments) {
      const field = args.constraints[0];
      return `All objects in ${args.property} must have a unique "${field}" value`;
    }
  }
  
  export function UniqueFieldInArray(field: string, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [field],
        validator: UniqueFieldInArrayConstraint,
      });
    };
  }
  