import 'reflect-metadata';
import { validateFieldDto } from './field-validator';
import { LanguageEnum } from '../enums/language.enum';

const baseValidDto = {
  id: 'test-id',
  label: [{ language: LanguageEnum.ENGLISH, text: 'Test Label' }],
  type: 'TEXT',
  required: true,
  disabled: false,
};

describe('Deprecated validateFieldDto (dispatcher delegate)', () => {
  describe('Valid cases', () => {
    it('routes a TEXT payload', () => {
      expect(validateFieldDto(baseValidDto)).toHaveLength(0);
    });

    it('routes a NUMBER payload', () => {
      expect(
        validateFieldDto({ ...baseValidDto, type: 'NUMBER', value: 1 }),
      ).toHaveLength(0);
    });
  });

  describe('Invalid field values', () => {
    it('returns a synthetic type error when discriminator is unknown', () => {
      const errors = validateFieldDto({
        ...baseValidDto,
        type: 'not-a-valid-type',
      });
      expect(errors.some((e) => e.property === 'type')).toBe(true);
    });

    it('returns errors for missing required base fields after routing', () => {
      const errors = validateFieldDto({ type: 'TEXT' });
      for (const prop of ['id', 'label', 'required', 'disabled']) {
        expect(errors.some((e) => e.property === prop)).toBe(true);
      }
    });
  });
});
