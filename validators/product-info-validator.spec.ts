import 'reflect-metadata';
import { ProductActionsEnum } from '../enums/item-actions.enum';
import { LanguageEnum } from '../enums/language.enum';
import { validateProductInfoDto } from './product-info.validator';
import { AttributeFieldDto } from '../dtos/attribute-field.dto';

describe('ProductInfoDto Validator', () => {
  const validField: AttributeFieldDto = {
    field: {
      id: 'field',
      label: [{ language: LanguageEnum.ENGLISH, text: 'label' }],
      type: 'TEXT',
      required: false,
      disabled: false,
      hidden: false,
      upgradable: false,
      value: 'string',
    } as AttributeFieldDto['field'],
  };

  const invalidField = {
    // missing required field, so `field` is undefined
  } as AttributeFieldDto;

  const testCases = [
    {
      description: 'should return no errors for valid DTO',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
      },
      expectedErrorsLength: 0,
    },
    {
      description: 'should return error for missing field in attribute',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [invalidField],
      },
      expectedErrorsLength: 1,
    },
    {
      description: 'should return error for invalid title',
      dto: {
        title: '',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
      },
      expectedErrorsLength: 1,
    },
    {
      description: 'should return error for unsupported action',
      dto: {
        title: 'Test',
        supportedActions: ['update'] as unknown as ProductActionsEnum[],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
      },
      expectedErrorsLength: 1,
    },
    {
      description: 'should return error for unsupported language',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [],
        productAttributes: [validField],
        itemAttributes: [validField],
      },
      expectedErrorsLength: 1,
    },
    {
      description:
        'should return no errors for valid DTO with adminPanel and clientPanel',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
        adminPanel: {
          tabs: {
            product: [{ label: 'Product', url: 'https://example.com/product' }],
          },
        },
        clientPanel: {
          tabs: { item: [{ label: 'Item', url: 'https://example.com/item' }] },
        },
      },
      expectedErrorsLength: 0,
    },
    {
      description:
        'should return error for invalid DTO with adminPanel and clientPanel',
      dto: {
        title: '',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
        adminPanel: {},
        clientPanel: {},
      },
      expectedErrorsLength: 3,
    },
    {
      description: 'should return no errors for valid DTO with payPerUseUnits',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
        payPerUseUnits: [
          { id: 'ram', unitDescription: 'MB', intervalDescription: 'month' },
        ],
      },
      expectedErrorsLength: 0,
    },
    {
      description: 'should return error for invalid DTO with payPerUseUnits',
      dto: {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [validField],
        itemAttributes: [validField],
        payPerUseUnits: [
          { id: '', unitDescription: '', intervalDescription: '' },
        ],
      },
      expectedErrorsLength: 1,
    },
  ];

  testCases.forEach(({ description, dto, expectedErrorsLength }) => {
    it(description, () => {
      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBe(expectedErrorsLength);
    });
  });

  describe('AttributeFieldDto class-level constraints inside ProductInfoDto', () => {
    it('fails when an AttributeFieldDto has only repeatableMin (AllOrNone)', () => {
      const fieldWithOnlyMin: AttributeFieldDto = {
        ...validField,
        repeatableMin: 1,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [fieldWithOnlyMin],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('fails when an AttributeFieldDto has only repeatableMax (AllOrNone)', () => {
      const fieldWithOnlyMax: AttributeFieldDto = {
        ...validField,
        repeatableMax: 5,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [fieldWithOnlyMax],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('passes when an AttributeFieldDto has both min and max with min <= max', () => {
      const fieldOk: AttributeFieldDto = {
        ...validField,
        repeatableMin: 1,
        repeatableMax: 3,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [fieldOk],
      };

      expect(validateProductInfoDto(dto)).toHaveLength(0);
    });

    it('fails when an AttributeFieldDto has min > max (Min<=Max)', () => {
      const fieldBad: AttributeFieldDto = {
        ...validField,
        repeatableMin: 5,
        repeatableMax: 2,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [fieldBad],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
