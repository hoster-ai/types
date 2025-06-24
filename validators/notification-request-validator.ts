import { validateSync, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { NotificationRequestDto } from '../dtos/notification/notification-request.dto';

/**
 * Validates a NotificationRequestDto object programmatically without relying on decorators.
 * This function can be used for DTOs imported from remote packages where decorators don't work.
 * 
 * @param data The object to validate as a NotificationRequestDto
 * @returns An array of validation errors, empty if validation succeeds
 */
export function validateNotificationRequestDto(data: any): ValidationError[] {
  // First, transform plain object to instance if needed
  const dto = plainToInstance(NotificationRequestDto, data);
  
  const errors: ValidationError[] = [];
  
  // Ensure notificationId exists and is a string
  if (!dto.notificationId) {
    const error = new ValidationError();
    error.property = 'notificationId';
    error.constraints = { isNotEmpty: 'notificationId should not be empty' };
    errors.push(error);
  } else if (typeof dto.notificationId !== 'string') {
    const error = new ValidationError();
    error.property = 'notificationId';
    error.constraints = { isString: 'notificationId must be a string' };
    errors.push(error);
  }
  
  // Ensure sender exists and is an object
  if (dto.sender === null) {
    const error = new ValidationError();
    error.property = 'sender';
    error.constraints = { isObject: 'sender must be an object' };
    errors.push(error);
  } else if (!dto.sender) {
    const error = new ValidationError();
    error.property = 'sender';
    error.constraints = { isNotEmpty: 'sender should not be empty' };
    errors.push(error);
  } else if (typeof dto.sender !== 'object') {
    const error = new ValidationError();
    error.property = 'sender';
    error.constraints = { isObject: 'sender must be an object' };
    errors.push(error);
  }
  
  // Ensure receiver exists and is an object
  if (dto.receiver === null) {
    const error = new ValidationError();
    error.property = 'receiver';
    error.constraints = { isObject: 'receiver must be an object' };
    errors.push(error);
  } else if (!dto.receiver) {
    const error = new ValidationError();
    error.property = 'receiver';
    error.constraints = { isNotEmpty: 'receiver should not be empty' };
    errors.push(error);
  } else if (typeof dto.receiver !== 'object') {
    const error = new ValidationError();
    error.property = 'receiver';
    error.constraints = { isObject: 'receiver must be an object' };
    errors.push(error);
  }
  
  return errors;
}

/**
 * A convenience wrapper that throws an error if validation fails
 * 
 * @param data The object to validate as a NotificationRequestDto
 * @throws Error if validation fails, with error message containing all validation errors
 */
export function validateNotificationRequestDtoOrThrow(data: any): void {
  const errors = validateNotificationRequestDto(data);
  
  if (errors.length > 0) {
    const errorMessages = errors.map(error => {
      const constraintValues = error.constraints ? Object.values(error.constraints) : [];
      return `${error.property}: ${constraintValues.join(', ')}`;
    }).join('; ');
    
    throw new Error(`Validation failed: ${errorMessages}`);
  }
}
