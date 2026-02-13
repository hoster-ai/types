import 'reflect-metadata';
import { validateInfoDto } from './info-validator';
import { LanguageEnum } from '../enums/language.enum';
import { EventsEnum } from '../enums/events.enum';
import { RolesEnum } from '../enums/roles.enum';

const baseValidDto = {
  title: 'My Integration',
  supportedLanguages: [LanguageEnum.ENGLISH],
};

describe('InfoDto Validator', () => {
  describe('Valid cases', () => {
    it('should return no errors for a valid DTO with required fields only', () => {
      expect(validateInfoDto(baseValidDto)).toHaveLength(0);
    });

    it('should return no errors with all optional fields', () => {
      const dto = {
        ...baseValidDto,
        logo: 'https://example.com/logo.png',
        description: 'A test integration',
        listenEvents: [EventsEnum.USER_CREATED],
        requiredRoles: [RolesEnum.FULL_ACCESS],
        onboardingUrl: 'https://example.com/onboarding',
      };
      expect(validateInfoDto(dto)).toHaveLength(0);
    });

    it('should return no errors with multiple supported languages', () => {
      const dto = {
        ...baseValidDto,
        supportedLanguages: [LanguageEnum.ENGLISH, LanguageEnum.FRENCH],
      };
      expect(validateInfoDto(dto)).toHaveLength(0);
    });
  });

  describe('Missing required fields', () => {
    it('should return errors when all fields are missing', () => {
      const errors = validateInfoDto({});
      expect(errors.some(e => e.property === 'title')).toBe(true);
      expect(errors.some(e => e.property === 'supportedLanguages')).toBe(true);
    });

    it('should return error when title is missing', () => {
      const { title, ...dto } = baseValidDto;
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'title')).toBe(true);
    });

    it('should return error when supportedLanguages is missing', () => {
      const { supportedLanguages, ...dto } = baseValidDto;
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'supportedLanguages')).toBe(true);
    });
  });

  describe('Invalid field values', () => {
    it('should return error for empty title', () => {
      const dto = { ...baseValidDto, title: '' };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'title')).toBe(true);
    });

    it('should return error for empty supportedLanguages array', () => {
      const dto = { ...baseValidDto, supportedLanguages: [] };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'supportedLanguages')).toBe(true);
    });

    it('should return error for invalid language enum', () => {
      const dto = { ...baseValidDto, supportedLanguages: ['INVALID'] };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'supportedLanguages')).toBe(true);
    });

    it('should return error for invalid logo URL (not https)', () => {
      const dto = { ...baseValidDto, logo: 'http://example.com/logo.png' };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'logo')).toBe(true);
    });

    it('should return error for invalid logo URL (not a URL)', () => {
      const dto = { ...baseValidDto, logo: 'not-a-url' };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'logo')).toBe(true);
    });

    it('should return error for invalid onboardingUrl', () => {
      const dto = { ...baseValidDto, onboardingUrl: 'not-a-url' };
      const errors = validateInfoDto(dto);
      expect(errors.some(e => e.property === 'onboardingUrl')).toBe(true);
    });

  });
});
