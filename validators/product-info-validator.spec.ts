import 'reflect-metadata';
// import { ProductInfoDto } from '../dtos/product/product-info.dto';
import { ProductItemActionsEnum } from '../enums/item-actions.enum';
import { LanguageEnum } from '../enums/language.enum';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { validateProductInfoDto } from './product-info.validator';
import { AttributeFieldDto } from '../dtos/attribute-field.dto';

describe('ProductInfoDto Validator', () => {

  const field: AttributeFieldDto = {
    id: 'field',
    label: [{ language: LanguageEnum.ENGLISH, text: "label" }],
    value: 'string',
    type: FieldTypeEnum.TEXT_BOX,
    required: false,
    disabled: false,
    hidden: false,
    upgradable: false
  };

  const invalidField = {
    id: 'field',
    label: [{ language: LanguageEnum.ENGLISH, text: "label" }],
    value: 'string',
    type: FieldTypeEnum.TEXT_BOX,
    disabled: false,
    upgradable: false
  } as AttributeFieldDto;

  const testCases = [
    {
      description: 'should return no errors for valid DTO',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 0
    },
    {
      description: 'should return error for invalid required and hidden',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [invalidField]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for invalid title',
      dto: {
        title: '',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for unsupported action',
      dto: {
        title: 'Test',
        supportedActions: ['update'] as any,
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for unsupported language',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return no errors for valid DTO with adminPanel and clientPanel',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field],
        adminPanel: { tabs: { product: [{ label: 'Product', url: 'https://example.com/product' }] } },
        clientPanel: { tabs: { item: [{ label: 'Item', url: 'https://example.com/item' }] } }
      },
      expectedErrorsLength: 0
    },
    {
      description: 'should return error for invalid DTO with adminPanel and clientPanel',
      dto: {
        title: '',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field],
        adminPanel: { /* invalid admin panel data */ },
        clientPanel: { /* invalid client panel data */ }
      },
      expectedErrorsLength: 3
    },
    {
      description: 'should return no errors for valid DTO with payPerUseUnits',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field],
        payPerUseUnits: [{ id: "ram", unitDescription: "MB", intervalDescription: "month" }]
      },
      expectedErrorsLength: 0
    },
    {
      description: 'should return error for invalid DTO with payPerUseUnits',
      dto: {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field],
        payPerUseUnits: [{ id: "", unitDescription: "", intervalDescription: "" }]
      },
      expectedErrorsLength: 1
    }
  ];

  testCases.forEach(({ description, dto, expectedErrorsLength }) => {
    it(description, () => {
      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBe(expectedErrorsLength);
    });
  });

  const validationErrorTestCases = [
    {
      description: 'should return ValidationError for missing title',
      dto: {
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrors: ['title']
    },
    {
      description: 'should return ValidationError for unsupported action',
      dto: {
        title: 'Test',
        supportedActions: ['update'] as any,
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrors: ['supportedActions']
    }
  ];

  validationErrorTestCases.forEach(({ description, dto, expectedErrors }) => {
    it(description, async () => {
      const errors = await validateProductInfoDto(dto);
      const errorProperties = errors.map(error => error.property);
      expectedErrors.forEach(expectedError => {
        expect(errorProperties).toContain(expectedError);
      });
    });
  });

  describe('FieldDto class-level constraints inside ProductInfoDto', () => {
    it('fails when a FieldDto has only repeatableMin (AllOrNone)', () => {
      const fieldWithOnlyMin: AttributeFieldDto = {
        id: 'f1',
        label: [{ language: LanguageEnum.ENGLISH, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [fieldWithOnlyMin],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('fails when a FieldDto has only repeatableMax (AllOrNone)', () => {
      const fieldWithOnlyMax: AttributeFieldDto = {
        id: 'f2',
        label: [{ language: LanguageEnum.ENGLISH, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        upgradable: false,
        hidden: false
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [fieldWithOnlyMax],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('passes when a FieldDto has both min and max with min <= max', () => {
      const fieldOk: AttributeFieldDto = {
        id: 'f3',
        label: [{ language: LanguageEnum.ENGLISH, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        productAttributes: [fieldOk],
      };

      expect(validateProductInfoDto(dto)).toHaveLength(0);
    });

    it('fails when a FieldDto has both min and max with min > max (Min<=Max)', () => {
      const fieldBad: AttributeFieldDto = {
        id: 'f4',
        label: [{ language: LanguageEnum.ENGLISH, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ProductItemActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.ENGLISH],
        itemAttributes: [fieldBad],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
