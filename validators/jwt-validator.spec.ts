import 'reflect-metadata';
import { validateJwtDto } from './jwt-validator';
import { RolesEnum } from '../enums/roles.enum';

describe('JwtDto Validator', () => {
  it('should return no errors for valid DTO', () => {
    const validDto = {
      jwt: {
        integrationId: '123',
        companyId: '456',
        acceptedRoles: [RolesEnum.FULL_ACCESS],
      },
    };

    const errors = validateJwtDto(validDto);
    expect(errors).toHaveLength(0);
  });

  it('should return error when nested jwt object is missing', () => {
    const invalidDto = {
      // Missing jwt object
    };

    const errors = validateJwtDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((e) => e.property === 'jwt')).toBe(true);
  });

  it('should return error when required fields in jwt are missing', () => {
    const invalidDto = {
      jwt: {
        // Missing integrationId and companyId
        acceptedRoles: [RolesEnum.FULL_ACCESS],
      },
    };

    const errors = validateJwtDto(invalidDto);
    expect(errors.length).toBeGreaterThan(0);
    // As the validation is on the nested object, the error will be in the children
    const jwtErrors = errors[0]?.children;
    expect(jwtErrors).toBeDefined();
    expect(jwtErrors!.some((e) => e.property === 'integrationId')).toBe(true);
    expect(jwtErrors!.some((e) => e.property === 'companyId')).toBe(true);
  });
});
