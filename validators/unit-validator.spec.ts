import 'reflect-metadata';
import { validateUnitDto } from '../validators/unit.validator';

describe('UnitDto Validator', () => {
  const validDto = {
    id: 'ram',
    unitDescription: 'MB',
    intervalDescription: 'month',
  };

  it('should return no errors for valid DTO', () => {
    expect(validateUnitDto(validDto)).toHaveLength(0);
  });

  it.each([
    [{ ...validDto, id: 6979466666 }, 'id'],
    [{ ...validDto, unitDescription: undefined }, 'unitDescription'],
    [{ ...validDto, intervalDescription: undefined }, 'intervalDescription'],
    [{ unitDescription: 'MB', intervalDescription: 'month' }, 'id'],
    [{ id: 6979466666, unitDescription: 'MB', intervalDescription: 'month' }, 'id'],
    [{ id: 'ram', unitDescription: 123, intervalDescription: 'month' }, 'unitDescription'],
    [{ id: 'ram', unitDescription: 'MB', intervalDescription: 123 }, 'intervalDescription'],
  ])('should return error for invalid %s', (dto, expectedErrorProp) => {
    const errors = validateUnitDto(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === expectedErrorProp)).toBe(true);
  });
});
