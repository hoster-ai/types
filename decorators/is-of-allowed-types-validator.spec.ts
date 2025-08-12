import 'reflect-metadata';
import { validateSync, ValidationOptions } from 'class-validator';
import { IsOfAllowedTypes } from './is-of-allowed-types.validator';

class DummyObject {}
class DummyArrayElement {}

class TestDto {
  @IsOfAllowedTypes(['string'])
  strProp: any;

  @IsOfAllowedTypes(['number'])
  numProp: any;

  @IsOfAllowedTypes(['boolean'])
  boolProp: any;

  @IsOfAllowedTypes(['object'])
  objProp: any;

  @IsOfAllowedTypes(['object'], { objectClass: DummyObject })
  typedObjProp: any;

  @IsOfAllowedTypes(['array'])
  arrProp: any;

  @IsOfAllowedTypes(['array'], { arrayElementClass: DummyArrayElement })
  typedArrProp: any;

  @IsOfAllowedTypes(['string', 'number'])
  multiTypeProp: any;
}

class OptionsTestDto {
  @IsOfAllowedTypes(['string'], { stringPattern: /^[a-z]+$/, require: true })
  strPatternProp: any;

  @IsOfAllowedTypes(['array'], { arrayNotEmpty: true })
  arrayNotEmptyProp: any;

  @IsOfAllowedTypes(['object'], { objectNotEmpty: true })
  objectNotEmptyProp: any;
}

class ArrayNotEmptyDto {
  @IsOfAllowedTypes(['array'], { arrayNotEmpty: true })
  value: any;
}

class ObjectNotEmptyDto {
  @IsOfAllowedTypes(['object'], { objectNotEmpty: true })
  value: any;
}

class ValidationOptionsDto {
  @IsOfAllowedTypes(['string'], { message: 'Custom error message' } as ValidationOptions)
  prop: any;
}

describe('IsOfAllowedTypes validator - compact', () => {
  it('accepts valid types', () => {
    const dto = new TestDto();
    dto.strProp = 'hello';
    dto.numProp = 42;
    dto.boolProp = true;
    dto.objProp = {};
    dto.typedObjProp = new DummyObject();
    dto.arrProp = [1, 2];
    dto.typedArrProp = [new DummyArrayElement()];
    dto.multiTypeProp = 'string or number';
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('rejects invalid types', () => {
    const dto = new TestDto();
    dto.strProp = 123;
    dto.numProp = 'string';
    dto.boolProp = 'true';
    dto.objProp = 'string';
    dto.typedObjProp = {};
    dto.arrProp = 'not array';
    dto.typedArrProp = [{}];
    dto.multiTypeProp = true;
    const errors = validateSync(dto).map(e => e.property);
    expect(new Set(errors)).toEqual(new Set([
      'arrProp',
      'boolProp',
      'multiTypeProp',
      'numProp',
      'objProp',
      'strProp',
      'typedArrProp',
      'typedObjProp',
    ]));
  });

  it('allows null or undefined when not required', () => {
    const dto = new TestDto();
    dto.strProp = null;
    dto.numProp = undefined;
    expect(validateSync(dto)).toHaveLength(0);
  });

  it('fails when objectClass is provided but instance check fails', () => {
    const dto = new TestDto();
    dto.typedObjProp = {};
    expect(validateSync(dto).some(e => e.property === 'typedObjProp')).toBe(true);
  });

  it('fails when arrayElementClass is provided but element check fails', () => {
    const dto = new TestDto();
    dto.typedArrProp = [{}];
    expect(validateSync(dto).some(e => e.property === 'typedArrProp')).toBe(true);
  });

  // Added coverage tests

  it('fails if string is empty but required', () => {
    const dto = new OptionsTestDto();
    dto.strPatternProp = '   ';
    const errors = validateSync(dto);
    expect(errors.some(e => e.property === 'strPatternProp')).toBe(true);
  });

  it('fails if string does not match pattern', () => {
    const dto = new OptionsTestDto();
    dto.strPatternProp = '123';
    const errors = validateSync(dto);
    expect(errors.some(e => e.property === 'strPatternProp')).toBe(true);
  });

  it('passes if string matches pattern', () => {
    const dto = new OptionsTestDto();
    dto.strPatternProp = 'abc';
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('fails if array is empty but arrayNotEmpty true', () => {
    const dto = new OptionsTestDto();
    dto.arrayNotEmptyProp = [];
    const errors = validateSync(dto);
    expect(errors.some(e => e.property === 'arrayNotEmptyProp')).toBe(true);
  });

  it('passes if array is non-empty and arrayNotEmpty true', () => {
    const dto = new ArrayNotEmptyDto();
    dto.value = [1];
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('fails if object is empty but objectNotEmpty true', () => {
    const dto = new OptionsTestDto();
    dto.objectNotEmptyProp = {};
    const errors = validateSync(dto);
    expect(errors.some(e => e.property === 'objectNotEmptyProp')).toBe(true);
  });

  it('passes if object is non-empty and objectNotEmpty true', () => {
    const dto = new ObjectNotEmptyDto();
    dto.value = { key: 'value' };
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it('accepts ValidationOptions as second argument', () => {
    const dto = new ValidationOptionsDto();
    dto.prop = 123;
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toBeDefined();
    expect(errors[0].constraints!).toHaveProperty('isOfAllowedTypes');
    expect(errors[0].constraints!['isOfAllowedTypes']).toContain('Custom error message');
  });
});
