import 'reflect-metadata';
// import { ProductInfoDto } from '../dtos/product/product-info.dto';
import { ActionsEnum } from '../enums/actions.enum';
import { LanguageEnum } from '../enums/language.enum';
import { FieldDto } from '../dtos/field.dto';
import { FieldTypeEnum } from '../enums/field-type.enum';
import { validateProductInfoDto } from './product-info.validator';

describe('ProductInfoDto Validator', () => {

  const field: FieldDto = {
    id: 'field',
    label: [{ language: LanguageEnum.EN, text: "label" }],
    value: 'string',
    type: FieldTypeEnum.TEXT_BOX,
    required: false,
    disabled: false,
    hidden: false,
    upgradable: false
  };

  const invalidField = {
    id: 'field',
    label: [{ language: LanguageEnum.EN, text: "label" }],
    value: 'string',
    type: FieldTypeEnum.TEXT_BOX,
    disabled: false,
    upgradable: false
  } as FieldDto;

  const testCases = [
    {
      description: 'should return no errors for valid DTO',
      dto: {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 0
    },
    {
      description: 'should return error for invalid required and hidden',
      dto: {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        itemAttributes: [invalidField]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for invalid title',
      dto: {
        title: '',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedLanguages: [LanguageEnum.EN],
        productAttributes: [field],
        itemAttributes: [field]
      },
      expectedErrorsLength: 1
    },
    {
      description: 'should return error for unsupported language',
      dto: {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
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
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
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
        supportedLanguages: [LanguageEnum.EN],
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
    it('fails when a FieldDto has only reapetableMin (AllOrNone)', () => {
      const fieldWithOnlyMin: FieldDto = {
        id: 'f1',
        label: [{ language: LanguageEnum.EN, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
        reapetableMin: 1,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        productAttributes: [fieldWithOnlyMin],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('fails when a FieldDto has only reapetableMax (AllOrNone)', () => {
      const fieldWithOnlyMax: FieldDto = {
        id: 'f2',
        label: [{ language: LanguageEnum.EN, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
        reapetableMax: 2,
      } as any;

      const dto = {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        itemAttributes: [fieldWithOnlyMax],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });

    it('passes when a FieldDto has both min and max with min <= max', () => {
      const fieldOk: FieldDto = {
        id: 'f3',
        label: [{ language: LanguageEnum.EN, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
        reapetableMin: 1,
        reapetableMax: 2,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        productAttributes: [fieldOk],
      };

      expect(validateProductInfoDto(dto)).toHaveLength(0);
    });

    it('fails when a FieldDto has both min and max with min > max (Min<=Max)', () => {
      const fieldBad: FieldDto = {
        id: 'f4',
        label: [{ language: LanguageEnum.EN, text: 'label' }],
        value: 'v',
        type: FieldTypeEnum.TEXT_BOX,
        required: false,
        disabled: false,
        hidden: false,
        upgradable: false,
        reapetableMin: 5,
        reapetableMax: 2,
      };

      const dto = {
        title: 'Test',
        supportedActions: [ActionsEnum.CREATE],
        supportedLanguages: [LanguageEnum.EN],
        itemAttributes: [fieldBad],
      };

      const errors = validateProductInfoDto(dto);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
