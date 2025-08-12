import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { IsPropertyForbidden } from '../decorators/is-property-forbidden.validator';

class TestDto {
  @IsPropertyForbidden('forbiddenProp', { message: 'forbiddenProp must not be present' })
  someProp?: any;
}

class TestDto2 {
  @IsPropertyForbidden('forbiddenProp')
  someProp?: any;
}

describe('IsPropertyForbidden decorator', () => {
  it('passes validation when forbidden property is absent', async () => {
    const dto = plainToInstance(TestDto, { someProp: 'allowed' });
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('fails validation when forbidden property is present', async () => {
    const dto = plainToInstance(TestDto, { someProp: 'allowed', forbiddenProp: 'not allowed' });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);

    // Validate error message
    expect(errors[0].constraints).toBeDefined();
    expect(errors[0].constraints).toHaveProperty('isPropertyForbidden');
    expect(errors[0].constraints!.isPropertyForbidden).toBe('forbiddenProp must not be present');
  });

  it('uses custom error message if provided', async () => {
    class CustomMessageDto {
      @IsPropertyForbidden('badProp', { message: 'Custom forbidden message' })
      prop?: any;
    }
    const dto = plainToInstance(CustomMessageDto, { prop: 'ok', badProp: 123 });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toBeDefined();
    expect(errors[0].constraints!.isPropertyForbidden).toBe('Custom forbidden message');
  });

  it('uses default error message if no message is provided', async () => {
    const dto = plainToInstance(TestDto2, { someProp: 'allowed', forbiddenProp: 'not allowed' });
    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toBeDefined();
    expect(errors[0].constraints!.isPropertyForbidden).toBe('Property \'forbiddenProp\' is not allowed');
  });
});
