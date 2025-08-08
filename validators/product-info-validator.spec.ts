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
        supportedActions: [],
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
        adminPanel: { /* valid admin panel data */ },
        clientPanel: { /* valid client panel data */ }
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
      expectedErrorsLength: 1
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
        supportedActions: [],
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
});
